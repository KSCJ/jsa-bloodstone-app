const { Schema } = require('mongoose');
const conn = require('../database');

const schemaOptions = {
  versionKey: false,
  autoIndex: false,
};

const buildingSchema = new Schema({
  type: String,
  level: { type: Number, default: 1 },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
}, schemaOptions);

buildingSchema.statics.createBasicBuildings = function (owner) {
  return this.create(
    { type: 'Townhall', owner },
    { type: 'Academy', owner },
    { type: 'Farm', owner },
    { type: 'Mine', owner },
  );
};

const BuildingModel = conn.model('Building', buildingSchema);
module.exports = BuildingModel;
