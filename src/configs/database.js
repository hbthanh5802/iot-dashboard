const Sequelize = require('sequelize');
const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
