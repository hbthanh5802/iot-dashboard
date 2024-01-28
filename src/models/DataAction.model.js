const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const DataActionModel = sequelize.define(
  'dataAction',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    action: {
      type: Sequelize.ENUM('ON', 'OFF'),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = DataActionModel;
