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
    message: 'Succeed to add a sensor',
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
    response.message = 'Failed to add a sensor';
    throw error;
  }
  return response;
};

sensorServices.updateSensor = async (payload) => {
  const { name, address, sensorId } = payload;
  const response = {
    statusCode: 200,
    message: 'Succeed to update sensor',
    data: {},
  };
  try {
    const requirements = { name, address };
    // UPDATE `iot_dashboard`.`sensors` SET `name` = 'Another-Sensors' WHERE (`id` = 'S2');
    let sensor = await SensorModel.update(requirements, {
      where: { id: sensorId },
    });
    sensor = await SensorModel.findByPk(sensorId);
    response.data = sensor;
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to update sensor';
    throw error;
  }
  return response;
};

sensorServices.fetchAll = async (payload) => {
  const response = {
    statusCode: 200,
    message: 'Succeed to get all sensors',
    data: {},
  };
  try {
    const sensors = await SensorModel.findAll();
    if (!sensors) response.message = 'No sensor found.';
    response.data = sensors;
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to get all sensors';
    throw error;
  }
  return response;
};

sensorServices.fetchSensor = async (payload) => {
  const { sensorId } = payload;
  const response = {
    statusCode: 200,
    message: 'Succeed to get a sensor',
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
  const { sensorId, temperature, humidity, brightness, dusty } = payload;
  const response = {
    statusCode: 201,
    message: 'Succeed to save data sensor',
    data: {},
  };
  try {
    const requirements = { sensorId, temperature, humidity, brightness, dusty };
    const sensor = await SensorModel.findByPk(sensorId);
    if (sensor) {
      const dataSensor = await sensor.createDataSensor(requirements);
      if (dataSensor) response.data = dataSensor;
    } else {
      response.statusCode = 404;
      response.message = 'Sensor not found';
    }
  } catch (error) {
    console.error('Error request:', error);
    response.statusCode = 500;
    response.message = 'Failed to  save data sensor';
    throw error;
  }
  return response;
};

sensorServices.fetchSensorDataByCriteria = async (payload) => {
  const response = {
    statusCode: 200,
    message: 'Succeed to get data sensor',
    data: {},
    meta: {},
  };
  try {
    const searchCriteria = payload;
    console.log('searchCriteria', searchCriteria);
    if (
      !searchCriteria ||
      typeof searchCriteria !== 'object' ||
      Object.keys(searchCriteria).length === 0
    ) {
      response.statusCode = 422; //  Unprocessable Entity
      response.message = 'Invalid search criteria.';
      return response;
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
      // SEARCH CONDITION
      const field = searchCriteria.searchField;
      const value = searchCriteria.searchValue;
      if (value) {
        // const operator = searchCriteria.searchOperator;
        if (!field || field === 'all') {
          const fieldColumns = ['temperature', 'humidity', 'brightness'];
          whereCondition = {
            ...whereCondition,
            [Op.or]: fieldColumns.map((item) => ({ [item]: value[0] })),
          };
        } else {
          whereCondition[field] = value[0];
        }
      }
      // ORDER CONDITION
      if (searchCriteria.orderBy && searchCriteria.direction) {
        const direction = searchCriteria.direction.toString().toUpperCase();
        orderCondition.push([`${searchCriteria.orderBy}`, `${direction}`]);
      }
      //
      if (
        Object.keys(whereCondition).length !== 0 ||
        searchCriteria.searchField === 'all'
      ) {
        condition.where = whereCondition;
      }
      if (orderCondition.length !== 0) condition.order = orderCondition;

      // Query
      const totalData = await DataSensorModel.count(condition);

      // Pagination
      let { page, pageSize } = searchCriteria;
      if (!page) page = 1;
      if (!pageSize) pageSize = 10;
      condition.limit = pageSize;
      condition.offset = (page - 1) * pageSize;
      // Query
      // console.log('conditionB', condition);
      let dataSensor = null;
      if (!searchCriteria.withSensorRef) {
        dataSensor = await DataSensorModel.findAll(condition);
      } else {
        dataSensor = await DataSensorModel.findAll({
          ...condition,
          include: SensorModel,
        });
      }

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

sensorServices.removeSensorData = async (payload) => {
  const { dataId } = payload;
  const response = {
    statusCode: 200,
    message: 'Succeed to delete data sensor',
    data: {},
  };
  try {
    if (!Array.isArray(dataId)) {
      response.statusCode = 422;
      response.message = 'The dataId is invalid';
      throw new Error(response.message);
    } else {
      const results = await DataSensorModel.destroy({
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
    response.message = 'Failed to delete data sensor';
    throw error;
  }
  return response;
};

module.exports = sensorServices;
