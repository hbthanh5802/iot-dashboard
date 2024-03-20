const { mqttClient, publishMessage } = require('../utils/mqttClient');
const DeviceModel = require('../models/Device.model');
const DataActionModel = require('../models/DataAction.model');
const { Op } = require('sequelize');
const dateHelper = require('../utils/date.helper');
const deviceServices = {};

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

deviceServices.fetchAll = async (payload) => {
  const response = {
    statusCode: 200,
    message: 'Success to get a device',
    data: {},
  };
  try {
    const devices = await DeviceModel.findAll();
    if (!devices) response.message = 'No device found.';
    response.data = devices;
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to get a device';
    throw error;
  }
  return response;
};

deviceServices.fetchDevice = async (payload) => {
  const { deviceId } = payload;
  const response = {
    statusCode: 200,
    message: 'Success to get a device',
    data: {},
  };
  try {
    if (!deviceId) throw new Error('No deviceId found!');
    const device = await DeviceModel.findByPk(deviceId);
    if (!device) response.message = 'No device found.';
    else response.data = device;
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to get a device';
    throw error;
  }
  return response;
};

deviceServices.updateDevice = async (payload) => {
  const { name, description, deviceId } = payload;
  const response = {
    statusCode: 201,
    message: 'Success to update device',
    data: {},
  };
  try {
    const requirements = { name, description };
    const device = await DeviceModel.update(requirements, {
      where: {
        id: deviceId,
      },
    });
    response.data = device;
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to update device';
    throw error;
  }
  return response;
};

deviceServices.updateDeviceStatus = async (payload) => {
  const { deviceId, action, _save } = payload;
  const response = {
    statusCode: 201,
    message: 'Success to update device status',
    data: {},
  };
  try {
    const requirements = { action: action ? 'ON' : 'OFF' };
    //  SELECT `id`, `name`, `description`, `createdAt`, `updatedAt` FROM `devices` AS `device` WHERE `device`.`id` = 'D1';
    const device = await DeviceModel.findByPk(deviceId);
    if (device) {
      //INSERT INTO `dataActions` (`id`,`action`,`createdAt`,`updatedAt`,`deviceId`) VALUES (DEFAULT,?,?,?,?);
      if (_save) {
        const deviceHistory = await device.createDataAction(requirements);
        response.data = deviceHistory;
      } else {
        response.message = 'Success to update device status but NOT SAVE';
      }
    } else {
      response.statusCode = 404;
      response.message = 'Device not found';
    }
  } catch (error) {
    response.statusCode = 500;
    response.message = 'Failed to update device status';
    throw error;
  }

  return response;
};

deviceServices.fetchDataActionByCriteria = async (payload) => {
  const response = {
    statusCode: 200,
    message: 'Success to get data device',
    data: {},
    meta: {},
  };
  try {
    const searchCriteria = payload;
    if (
      !searchCriteria ||
      typeof searchCriteria !== 'object' ||
      Object.keys(searchCriteria).length === 0
    ) {
      response.statusCode = 422; //  Unprocessable Entity
      response.message = 'Invalid search criteria.';
    } else {
      let condition = {};
      let whereCondition = {};
      let orderCondition = [];
      // WHERE condition
      if (searchCriteria.deviceId) {
        whereCondition.deviceId = {
          [Op.eq]: searchCriteria.deviceId,
        };
      }
      // Date
      if (searchCriteria.startDate && searchCriteria.endDate) {
        whereCondition.createdAt = {
          [Op.between]: [
            dateHelper.convertDateFormat(searchCriteria.startDate),
            dateHelper.convertDateFormat(searchCriteria.endDate),
          ],
        };
      } else if (searchCriteria.startDate) {
        whereCondition.createdAt = {
          [Op.gte]: dateHelper.convertDateFormat(searchCriteria.startDate),
        };
      } else if (searchCriteria.endDate) {
        whereCondition.createdAt = {
          [Op.lte]: dateHelper.convertDateFormat(searchCriteria.endDate),
        };
      }
      // ACTION CONDITION
      if (searchCriteria.action) {
        whereCondition.action = searchCriteria.action.trim();
      }
      // ORDER CONDITION
      if (searchCriteria.orderBy && searchCriteria.direction) {
        const direction = searchCriteria.direction.toString().toUpperCase();
        orderCondition.push([`${searchCriteria.orderBy}`, `${direction}`]);
      }
      if (Object.keys(whereCondition).length !== 0)
        condition.where = whereCondition;
      if (orderCondition.length !== 0) condition.order = orderCondition;
      // Query
      const totalData = await DataActionModel.count(condition);
      // Pagination
      let { page, pageSize } = searchCriteria;
      if (!page) page = 1;
      if (!pageSize) pageSize = 10;
      condition.limit = pageSize;
      condition.offset = (page - 1) * pageSize;
      // Query
      const dataAction = await DataActionModel.findAll(condition);

      response.data = dataAction;
      response.meta.pagination = {
        count: dataAction.length,
        total: totalData,
        pageSize,
        currentPage: page,
        totalPage: Math.ceil(totalData / pageSize),
        hasNext: page * pageSize < totalData,
        hasPrevious: page > 1,
      };
    }
  } catch (error) {
    response.statusCode = 500;
    response.message = 'Failed to get data device';
    throw error;
  }
  return response;
};

deviceServices.removeActionData = async (payload) => {
  const { dataId } = payload;
  const response = {
    statusCode: 200,
    message: 'Success to delete data action',
    data: {},
  };
  try {
    if (!Array.isArray(dataId)) {
      response.statusCode = 422;
      response.message = 'The dataId is invalid';
      throw new Error(response.message);
    } else {
      const results = await DataActionModel.destroy({
        where: {
          id: {
            [Op.in]: dataId,
          },
        },
      });
      response.data = results;
    }
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to delete data action';
    throw error;
  }
  return response;
};

module.exports = deviceServices;
