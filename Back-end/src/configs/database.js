const Sequelize = require('sequelize');
const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+07:00',
  logging: (msg) => console.log('====>', msg),
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
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
