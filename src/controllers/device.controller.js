const deviceServices = require('../services/device.service');

const deviceController = {};

deviceController.createNew = async (req, res, next) => {
  let response;
  const { name, description, deviceId } = req.body;
  try {
    const payload = { name, description };
    if (deviceId) payload.deviceId = deviceId;
    response = await deviceServices.createDevice(payload);
    res.status(201).json(response);
  } catch (error) {
    console.log('Error request:', error);
    res.status(500).json(response);
    return next(error);
  }
};

deviceController.updateDevice = async (req, res, next) => {
  let response;
  const { deviceId, action } = req.body;
  try {
    if (!deviceId) return res.sendStatus(422);
    const payload = { deviceId, action };
    response = await deviceServices.updateDevice(payload);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error request:', error);
    return next(error);
  }
};

module.exports = deviceController;