const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const { mqttClient, subscribeTopic } = require('./utils/mqttClient');

dotenv.config();

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
const useRoutes = require('./routes/index');
useRoutes(app);

app.use((error, req, res, next) => {
  console.log(error);
  return res.sendStatus(500);
});

// MQTT
mqttClient.on('connect', () => {
  if (mqttClient.connected === true) {
    // subscribe to a topic
    subscribeTopic('esp8266/sensor');
    subscribeTopic('esp8266/device/status');
  }
});

// Sync the models with database
const PORT = process.env.PORT || 4005;
const sequelize = require('./configs/database');
const SensorModel = require('./models/Sensor.model');
const DataSensor = require('./models/DataSensor.model');
const DeviceModel = require('./models/Device.model');
const DataActionModel = require('./models/DataAction.model');

// Define the relationships
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
