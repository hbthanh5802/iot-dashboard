const sensorServices = require('../services/sensor.service');

const sensorController = {};

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

module.exports = sensorController;
