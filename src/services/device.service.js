const DeviceModel = require('../models/Device.model');
const deviceServices = {};

deviceServices.createDevice = async (payload) => {
  console.log('payload', payload);
  const { name, description } = payload;
  const response = {
    statusCode: 201,
    message: 'Success to add device',
    data: {},
  };
  try {
    const requirements = { name, description };
    const device = await DeviceModel.create(requirements);
    response.data = device;
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to add device';
  }
  return response;
};

deviceServices.updateDevice = async (payload) => {
  console.log(payload);
  const { deviceId, action } = payload;
  const response = {
    statusCode: 200,
    message: 'Success to update device',
    data: {},
  };
  try {
    const requirements = { action: action ? 'ON' : 'OFF' };
    const device = await DeviceModel.findByPk(deviceId);
    if (device) {
      const deviceHistory = await device.createDataAction(requirements);
      response.data = deviceHistory;
    } else {
      response.statusCode = 404;
      response.message = 'Device not found';
    }
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to add device';
  }
};

module.exports = deviceServices;
