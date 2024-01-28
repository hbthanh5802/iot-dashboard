const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const DataSensor = sequelize.define(
  'dataSensor',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    temperature: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    moisture: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    brightness: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = DataSensor;
