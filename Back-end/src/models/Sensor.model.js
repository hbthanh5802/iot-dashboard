const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const SensorModel = sequelize.define(
  'sensor',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = SensorModel;
