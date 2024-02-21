const deviceServices = require('../services/device.service');

const deviceController = {};

deviceController.createNew = async (req, res, next) => {
  let response;
  try {
    response = await deviceServices.createDevice(req.body);
    res.status(201).json(response);
  } catch (error) {
    console.error('Error request:', error);
    res.status(500).json(response);
  }
};

deviceController.updateDevice = async (req, res, next) => {
  let response;
  try {
    response = await deviceServices.updateDevice(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error request:', error);
    res.status(500).json(response);
  }
};

module.exports = deviceController;
