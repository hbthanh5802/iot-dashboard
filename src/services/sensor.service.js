const { mqttClient, publishMessage } = require('../utils/mqttClient');
const SensorModel = require('../models/Sensor.model');
const sensorServices = {};

sensorServices.createSensor = async (payload) => {
  const { name, address, sensorId } = payload;
  const response = {
    statusCode: 201,
    message: 'Success to add device',
    data: {},
  };
  try {
    const requirements = { id: sensorId, name, address };
    // INSERT INTO `sensors` (`id`,`name`,`address`,`createdAt`,`updatedAt`) VALUES (?,?,?,?,?);
    const sensor = await SensorModel.create(requirements);
    response.data = sensor;
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to add device';
    throw error;
  }
  return response;
};

sensorServices.saveSensorData = async (payload) => {
  const { sensorId, temperature, humidity, brightness } = payload;
  const response = {
    statusCode: 201,
    message: 'Success to add device',
    data: {},
  };
  try {
    const requirements = {
      sensorId,
      temperature: (+temperature).toFixed(2),
      humidity: (+humidity).toFixed(2),
      brightness,
    };
    const sensor = await SensorModel.findByPk(sensorId);
    console;
    if (sensor) {
      const dataSensor = await sensor.createDataSensor(requirements);
      if (dataSensor) response.data = dataSensor;
    }
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to add device';
    throw error;
  }
  return response;
};

module.exports = sensorServices;
