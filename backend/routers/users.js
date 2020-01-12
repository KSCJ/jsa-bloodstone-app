const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const { UserModel } = require('../models');
const { auth } = require('../middlewares');

const router = Router();

async function getUser(req, res, next) {
  const id = Number.parseInt(req.params.uid, 10);
  try {
    if (!id) {
      throw createError(400, 'Please specify user id');
    }
    const user = await UserModel.find({ id });
    if (user.length === 0) {
      throw createError(404, 'User not found with that id');
    }
    res.send(user[0]);
  } catch (error) {
    next(error);
  }
}

function isValidEmail(email) {
  const emailChecker = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailChecker.test(String(email).toLowerCase());
}

async function register(req, res, next) {
  const {
    username, password, email, kingdomName,
  } = req.body;
  try {
    if (!username && !password) {
      throw createError(400, 'Username and password are required.');
    }
    if (!username) {
      throw createError(400, 'Username is required.');
    }
    if (!password) {
      throw createError(400, 'Password is required.');
    }
    if (!email) {
      throw createError(400, 'Email is required.');
    }
    if (!isValidEmail(email)) {
      throw createError(400, 'Email is not valid.');
    }
    if (password.length < 8) {
      throw createError(400, 'Password must be at least 8 characters.');
    }
    if (await UserModel.findOne({ username })) {
      throw createError(400, 'Username is already taken.');
    }
    if (await UserModel.findOne({ email })) {
      throw createError(400, 'Email is already taken.');
    }
    const passwordHash = await bcrypt.hash(password, 8);
    const user = await UserModel.create({
      email,
      username,
      password: passwordHash,
      kingdomName: kingdomName || `${username}'s kingdom`,
      planetList: [],
    });
    delete user.password;
    const token = jwt.sign({ user }, process.env.APP_SECRET || 'testSecret');
    res.status(201).send({ status: 201, token });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { username, password } = req.body;
  try {
    if (!username && !password) {
      throw createError(400, 'All fields are required.');
    }
    if (!username) {
      throw createError(400, 'Username is required.');
    }
    if (!password) {
      throw createError(400, 'Password is required.');
    }
    const user = await UserModel.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw createError(400, 'Username or password is incorrect.');
    }

    delete user.password;
    const token = jwt.sign({ user }, process.env.APP_SECRET || 'testSecret');
    res.status(200).send({ status: 200, token });
  } catch (error) {
    next(error);
  }
}

async function updateUserInfo(req, res, next) {
  const { _id } = req.user;
  const {
    username: newUsername, email: newEmail, password: newPassword, kingdomName: newKingdomName,
  } = req.body;
  try {
    const changedTarget = {};
    if (newUsername) {
      changedTarget.username = newUsername;
    }
    if (newEmail) {
      changedTarget.email = newEmail;
    }
    if (newPassword) {
      const passwordHash = await bcrypt.hash(newPassword, 8);
      changedTarget.password = passwordHash;
    }
    if (newKingdomName) {
      changedTarget.kingdomName = newKingdomName;
    }
    const changedValue = Object.keys(changedTarget);
    if (changedValue.length === 0) {
      throw createError(400, 'Please fill at least one element');
    }
    const user = await UserModel.findByIdAndUpdate(
      _id,
      { $set: changedTarget },
      { new: true, fields: '-_id' },
    );
    if (!user) {
      throw createError(400, 'Can\'t find this username in database');
    }
    res.status(202).send({ status: 202, changes: Object.keys(changedTarget) });
  } catch (error) {
    next(error);
  }
}

async function getTopRanking(req, res, next) {
  try {
    const users = await UserModel.find({}, '-password');
    res.send({ status: 200, users });
  } catch (error) {
    next(error);
  }
}

router.post('/login', login);
router.post('/register', register);
router.get('/ranking', getTopRanking);
router.patch('/settings', auth, updateUserInfo);
router.get('/:uid?', getUser);

module.exports = router;
