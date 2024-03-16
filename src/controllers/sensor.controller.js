const sensorServices = require('../services/sensor.service');
const { mqttClient, publishMessage } = require('../utils/mqttClient');

const sensorController = {};

const saveSensorData = async (data) => {
  let response;
  const { temperatureC, humidity, brightness } = data;
  try {
    const payload = {
      sensorId: 'S1',
      temperature: temperatureC,
      humidity,
      brightness,
    };
    response = await sensorServices.saveSensorData(payload);
    return response;
  } catch (error) {
    console.log('Error request:', error);
    throw new Error(error);
  }
};

sensorController.createNew = async (req, res, next) => {
  let response;
  const { sensorId, name, address } = req.body;
  try {
    const payload = { sensorId, name, address };
    response = await sensorServices.createSensor(payload);
    res.status(201).json(response);
  } catch (error) {
    console.log('Error request:', error);
    return next(error);
  }
};

sensorController.getDataSensor = async (req, res, next) => {
  let response;
  const { sensorId, startDate, endDate, orderBy, direction, page, pageSize } =
    req.query;
  try {
    const payload = {
      sensorId,
      startDate,
      endDate,
      orderBy,
      direction,
      page: +page,
      pageSize: +pageSize,
    };
    response = await sensorServices.fetchSensorDataByCriteria(payload);
    res.status(201).json(response);
  } catch (error) {
    console.log('Error request:', error);
    return next(error);
  }
};

// called each time a message is received
mqttClient.on('message', function (topic, message) {
  if (mqttClient.connected) {
    const messageObj = JSON.parse(message);
    console.log(`Received message from [${topic}]:`, messageObj);
    if (topic === 'esp8266/sensor') {
      saveSensorData(messageObj);
    }
  }
});

module.exports = sensorController;
