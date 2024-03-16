const { mqttClient, publishMessage } = require('../utils/mqttClient');
const DeviceModel = require('../models/Device.model');
const deviceServices = {};

let fanIds = ['D1'];
let lightIds = ['D2'];

deviceServices.createDevice = async (payload) => {
  const { name, description, deviceId } = payload;
  const response = {
    statusCode: 201,
    message: 'Success to add device',
    data: {},
  };
  try {
    const requirements = { name, description };
    if (deviceId) requirements.id = deviceId;
    const device = await DeviceModel.create(requirements);
    response.data = device;
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to add device';
    throw error;
  }
  return response;
};

deviceServices.updateDevice = async (payload) => {
  const { deviceId, action } = payload;
  const response = {
    statusCode: 200,
    message: 'Success to update device',
    data: {},
  };
  try {
    const requirements = { action: action ? 'ON' : 'OFF' };
    //  SELECT `id`, `name`, `description`, `createdAt`, `updatedAt` FROM `devices` AS `device` WHERE `device`.`id` = 'D1';
    const device = await DeviceModel.findByPk(deviceId);
    if (device) {
      //INSERT INTO `dataActions` (`id`,`action`,`createdAt`,`updatedAt`,`deviceId`) VALUES (DEFAULT,?,?,?,?);
      const deviceHistory = await device.createDataAction(requirements);
      response.data = deviceHistory;
      //
      if (fanIds.includes(deviceId)) {
        publishMessage(`esp8266/device/fan`, requirements);
      } else if (lightIds.includes(deviceId)) {
        publishMessage(`esp8266/device/light`, requirements);
      }
    } else {
      response.statusCode = 404;
      response.message = 'Device not found';
    }
  } catch (error) {
    response.statusCode = 500;
    response.message = 'Failed to add device';
    throw error;
  }

  return response;
};

module.exports = deviceServices;
