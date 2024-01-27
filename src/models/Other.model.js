const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

// sequelize.define(modelName, attributes, options)
const OtherModel = sequelize.define('other', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OtherModel;
