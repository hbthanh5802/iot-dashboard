const { mqttClient, publishMessage } = require('../utils/mqttClient');
const SensorModel = require('../models/Sensor.model');
const DataSensorModel = require('../models/DataSensor.model');
const { Op } = require('sequelize');
const dateHelper = require('../utils/date.helper');
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

sensorServices.fetchAll = async (payload) => {
  const response = {
    statusCode: 200,
    message: 'Success to get a device',
    data: {},
  };
  try {
    const sensors = await SensorModel.findAll();
    if (!sensors) response.message = 'No sensor found.';
    response.data = sensors;
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to get a device';
    throw error;
  }
  return response;
};

sensorServices.fetchSensor = async (payload) => {
  const { sensorId } = payload;
  const response = {
    statusCode: 200,
    message: 'Success to get a sensor',
    data: {},
  };
  try {
    if (!sensorId) throw new Error('No sensorId found!');
    const sensor = await SensorModel.findByPk(sensorId);
    if (!sensor) response.message = 'No sensor found.';
    else response.data = sensor;
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to get a sensor';
    throw error;
  }
  return response;
};

sensorServices.saveSensorData = async (payload) => {
  const { sensorId, temperature, humidity, brightness } = payload;
  const response = {
    statusCode: 201,
    message: 'Success to add device',
    data: {},
  };
  try {
    const requirements = {
      sensorId,
      temperature: (+temperature).toFixed(2),
      humidity: (+humidity).toFixed(2),
      brightness,
    };
    const sensor = await SensorModel.findByPk(sensorId);
    console;
    if (sensor) {
      const dataSensor = await sensor.createDataSensor(requirements);
      if (dataSensor) response.data = dataSensor;
    }
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to add device';
    throw error;
  }
  return response;
};

sensorServices.fetchSensorDataByCriteria = async (payload) => {
  const response = {
    statusCode: 200,
    message: 'Success to get data sensor',
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
      if (searchCriteria.sensorId) {
        whereCondition.sensorId = {
          [Op.substring]: searchCriteria.sensorId,
        };
      }
      // console.log('Date', searchCriteria.startDate, searchCriteria.endDate);
      // console.log(
      //   'Date',
      //   dateHelper.convertDateFormat(searchCriteria.startDate),
      //   dateHelper.convertDateFormat(searchCriteria.endDate)
      // );
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
      // ORDER CONDITION
      if (searchCriteria.orderBy && searchCriteria.direction) {
        const direction = searchCriteria.direction.toString().toUpperCase();
        orderCondition.push([`${searchCriteria.orderBy}`, `${direction}`]);
      }
      if (Object.keys(whereCondition).length !== 0)
        condition.where = whereCondition;
      if (orderCondition.length !== 0) condition.order = orderCondition;
      // Query
      // console.log('conditionA', condition);
      const totalData = await DataSensorModel.count(condition);
      // console.log('totalData', totalData);
      // Pagination
      let { page, pageSize } = searchCriteria;
      if (!page) page = 1;
      if (!pageSize) pageSize = 10;
      condition.limit = pageSize;
      condition.offset = (page - 1) * pageSize;
      // Query
      // console.log('conditionB', condition);
      const dataSensor = await DataSensorModel.findAll(condition);

      response.data = dataSensor;
      response.meta.pagination = {
        count: dataSensor.length,
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
    response.message = 'Failed to get data sensor';
    throw error;
  }
  return response;
};

module.exports = sensorServices;
