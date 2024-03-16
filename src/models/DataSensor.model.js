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
      allowNull: true,
    },
    moisture: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    brightness: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = DataSensor;
