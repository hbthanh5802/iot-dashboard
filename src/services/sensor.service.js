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

module.exports = sensorServices;
