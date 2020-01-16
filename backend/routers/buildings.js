const { Router } = require('express');
const createError = require('http-errors');
const { BuildingModel, ResourceModel } = require('../models');
const { auth } = require('../middlewares');

const router = Router();

const {
  townhallRule, farmRule, mineRule, academyRule, foxRule,
} = require('../rules');

const buildingRules = {
  Townhall: townhallRule,
  Academy: academyRule,
  Farm: farmRule,
  Mine: mineRule,
};

async function getBuildings(req, res, next) {
  const { _id: owner } = req.user;
  try {
    const buildings = await BuildingModel.find({ owner });
    const priceOfBuilding = [
      buildingRules.Farm.constructionCost,
      buildingRules.Mine.constructionCost,
    ];
    res.send({ buildings, priceOfBuilding });
  } catch (error) {
    next(error);
  }
}

async function createBuilding(req, res, next) {
  const { _id: owner } = req.user;
  const buildingType = req.body.type;
  try {
    if (!buildingType) {
      throw createError(400, 'Type is required');
    }
    if (buildingType !== 'Mine' && buildingType !== 'Farm') {
      throw createError(400, 'Wrong type');
    }

    const priceOfItem = parseInt(buildingRules[buildingType].constructionCost, 10);
    if (!await ResourceModel.checkIfHasEnoughGold(owner, priceOfItem)) {
      throw createError(400, 'You don\'t have enough money');
    }
    await ResourceModel.reduceGold(owner, priceOfItem);
    const newBuilding = await BuildingModel.create({
      type: buildingType,
      owner,
    });
    res.send({ status: 200, newBuilding });
  } catch (error) {
    next(error);
  }
}

async function getBuildingById(req, res, next) {
  const { _id: owner } = req.user;
  const id = req.params.buildingId;
  try {
    const building = await BuildingModel.findById(id);
    if (!building) {
      throw createError(404, 'This building doesn\'t exist.');
    }
    if (building.owner.toHexString() !== owner) {
      throw createError(404, 'This building doesn\'t belong to you');
    }
    res.send({
      building,
      rules: {
        buildingRules: buildingRules[building.type],
        troopsRules: foxRule,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function upgradeBuildingById(req, res, next) {
  const { _id: owner } = req.user;
  const id = req.params.buildingId;
  try {
    const { level: maxLevel } = await BuildingModel.findOne({ type: 'Townhall', owner });
    const upgradeBuilding = await BuildingModel.findOne({ _id: id, owner });
    if (!upgradeBuilding) {
      throw createError(400, 'This building doesn\'t exist');
    }
    if (upgradeBuilding.level >= maxLevel) {
      throw createError(400, 'Currently this building reaches its maximum level');
    }
    let priceOfItem = 0;
    switch (upgradeBuilding.level) {
      case 1:
        priceOfItem = parseInt(buildingRules[upgradeBuilding.type].upgradingCostLevel1, 10);
        break;
      case 2:
        priceOfItem = parseInt(buildingRules[upgradeBuilding.type].upgradingCostLevel2, 10);
        break;
      case 3:
        priceOfItem = parseInt(buildingRules[upgradeBuilding.type].upgradingCostLevel3, 10);
        break;
      default:
        priceOfItem = 1;
    }
    if (!await ResourceModel.checkIfHasEnoughGold(owner, priceOfItem)) {
      throw createError(400, 'You don\'t have enough money');
    }
    await ResourceModel.reduceGold(owner, priceOfItem);
    upgradeBuilding.level += 1;
    await upgradeBuilding.save();
    res.status(202).send(upgradeBuilding);
  } catch (error) {
    next(error);
  }
}

router.get('/', auth, getBuildings);
router.post('/', auth, createBuilding);
router.get('/:buildingId', auth, getBuildingById);
router.patch('/:buildingId', auth, upgradeBuildingById);

module.exports = router;
