const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

// sequelize.define(modelName, attributes, options)
const TestModel = sequelize.define('test', {
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
});

module.exports = TestModel;
