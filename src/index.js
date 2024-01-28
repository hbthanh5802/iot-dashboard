const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes
const useRoutes = require('./routes/index');
useRoutes(app);

// Sync the models with database
const PORT = process.env.PORT || 4005;
const sequelize = require('./configs/database');
const SensorModel = require('./models/Sensor.model');
const DataSensor = require('./models/DataSensor.model');
const DeviceModel = require('./models/Device.model');
const DataActionModel = require('./models/DataAction.model');

SensorModel.hasMany(DataSensor);
DataSensor.belongsTo(SensorModel);
DeviceModel.hasMany(DataActionModel);
DataActionModel.belongsTo(DeviceModel);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database synchronized.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });
