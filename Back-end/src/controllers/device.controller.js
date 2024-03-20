const deviceServices = require('../services/device.service');
const { mqttClient, publishMessage } = require('../utils/mqttClient');

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

deviceController.getAll = async (req, res, next) => {
  let response;
  try {
    response = await deviceServices.fetchAll();
    res.status(200).json(response);
  } catch (error) {
    console.log('Error request:', error);
    res.status(500).json(response);
    return next(error);
  }
};

deviceController.getDevice = async (req, res, next) => {
  let response;
  const { deviceId } = req.params;
  try {
    if (!deviceId) return res.sendStatus(422);
    const payload = { deviceId };
    response = await deviceServices.fetchDevice(payload);
    res.status(200).json(response);
  } catch (error) {
    console.log('Error request:', error);
    res.status(500).json(response);
    return next(error);
  }
};

deviceController.updateDevice = async (req, res, next) => {
  let response;
  const { name, description, deviceId } = req.body;
  try {
    const payload = { name, description };
    if (deviceId) payload.deviceId = deviceId;
    response = await deviceServices.fetchDevice(payload);
    res.status(201).json(response);
  } catch (error) {
    console.log('Error request:', error);
    res.status(500).json(response);
    return next(error);
  }
};

deviceController.updateDeviceStatus = async (req, res, next) => {
  let response;
  const { deviceId, action, _save } = req.body;
  try {
    if (!deviceId) return res.sendStatus(422);
    const payload = { deviceId, action, _save };
    if (!mqttClient.connected) return res.sendStatus(500);
    response = await deviceServices.updateDeviceStatus(payload);
    if (response.statusCode === 201) {
      if (deviceId.includes(['D1'])) {
        publishMessage(`esp8266/device/fan`, { action: action ? 'ON' : 'OFF' });
      } else if (deviceId.includes(['D2'])) {
        publishMessage(`esp8266/device/light`, {
          action: action ? 'ON' : 'OFF',
        });
      }
    }
    res.status(201).json(response);
  } catch (error) {
    console.error('Error request:', error);
    return next(error);
  }
};

deviceController.getDataAction = async (req, res, next) => {
  let response;
  const {
    deviceId,
    startDate,
    endDate,
    orderBy,
    direction,
    page,
    pageSize,
    action,
  } = req.query;
  try {
    const payload = {
      deviceId,
      startDate,
      endDate,
      orderBy,
      direction,
      action,
      page: +page,
      pageSize: +pageSize,
    };
    response = await deviceServices.fetchDataActionByCriteria(payload);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error request:', error);
    return next(error);
  }
};

deviceController.deleteDataAction = async (req, res, next) => {
  let response;
  const { dataId } = req.query;
  try {
    if (!dataId) return res.sendStatus(422);
    let id = dataId && dataId.split(',').map((item) => +item);
    const payload = {
      dataId: id,
    };
    response = await deviceServices.removeActionData(payload);
    res.status(200).json(response);
  } catch (error) {
    console.log('Error request:', error);
    return next(error);
  }
};

module.exports = deviceController;
