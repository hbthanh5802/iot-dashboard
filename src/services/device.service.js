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
    const properties = { name, description };
    const device = await DeviceModel.create(properties);
    response.data = device;
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to add device';
  }
  return response;
};

module.exports = deviceServices;
