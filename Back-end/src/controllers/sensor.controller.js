const sensorServices = require('../services/sensor.service');
const { mqttClient, publishMessage } = require('../utils/mqttClient');
const io = require('.././index');

const sensorController = {};

const saveSensorData = async (data) => {
  let response;
  let { temperatureC, humidity, brightness, sensorId } = data;
  try {
    if (!sensorId) sensorId = 'S1';
    const payload = {
      sensorId,
      temperature: temperatureC,
      humidity,
      brightness,
    };
    response = await sensorServices.saveSensorData(payload);
    return response;
  } catch (error) {
    console.log('Error request:', error);
    throw new Error(error);
  }
};

sensorController.createNew = async (req, res, next) => {
  let response;
  const { sensorId, name, address } = req.body;
  try {
    const payload = { sensorId, name, address };
    response = await sensorServices.fetchSensor(payload);
    if (Object.keys(response.data).length !== 0) {
      response.statusCode = 400;
      response.message = 'Sensor already exists.';
      delete response.data;
      return res.status(400).json(response);
    }
    response = await sensorServices.createSensor(payload);
    res.status(201).json(response);
  } catch (error) {
    console.log('Error request:', error);
    return next(error);
  }
};

sensorController.getAll = async (req, res, next) => {
  let response;
  try {
    response = await sensorServices.fetchAll();
    res.status(200).json(response);
  } catch (error) {
    console.log('Error request:', error);
    res.status(500).json(response);
    return next(error);
  }
};

sensorController.getSensor = async (req, res, next) => {
  let response;
  const { sensorId } = req.params;
  try {
    if (!sensorId) return res.sendStatus(422);
    const payload = { sensorId };
    response = await sensorServices.fetchSensor(payload);
    if (Object.keys(response.data).length === 0) {
      response.statusCode = 404;
      delete response.data;
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    console.log('Error request:', error);
    res.status(500).json(response);
    return next(error);
  }
};

sensorController.updateSensor = async (req, res, next) => {
  let response;
  const { sensorId, name, address } = req.body;
  try {
    if (!sensorId) return res.sendStatus(422);
    const payload = { sensorId, name, address };
    response = await sensorServices.fetchSensor(payload);
    if (Object.keys(response.data).length === 0) {
      response.statusCode = 404;
      delete response.data;
      return res.status(404).json(response);
    }
    response = await sensorServices.updateSensor(payload);
    res.status(200).json(response);
  } catch (error) {
    console.log('Error request:', error);
    res.status(500).json(response);
    return next(error);
  }
};

sensorController.getDataSensor = async (req, res, next) => {
  let response;
  let {
    sensorId,
    startDate,
    endDate,
    orderBy,
    direction,
    page,
    pageSize,
    searchField,
    searchValue,
    searchOperator, // equal, greater, less, inRange
  } = req.query;
  try {
    if (searchValue) {
      searchValue = searchValue?.split(',').map((value) => +value);
    }
    const payload = {
      sensorId,
      startDate,
      endDate,
      orderBy,
      direction,
      page: +page,
      pageSize: +pageSize,
      searchField,
      searchValue: searchValue,
      searchOperator,
    };
    response = await sensorServices.fetchSensorDataByCriteria(payload);
    res.status(200).json(response);
  } catch (error) {
    console.log('Error request:', error);
    return next(error);
  }
};

sensorController.deleteDataSensor = async (req, res, next) => {
  let response;
  const { dataId } = req.query;
  try {
    if (!dataId) return res.sendStatus(422);
    let id = dataId && dataId.split(',').map((item) => +item);
    const payload = {
      dataId: id,
    };
    response = await sensorServices.removeSensorData(payload);
    res.status(200).json(response);
  } catch (error) {
    console.log('Error request:', error);
    return next(error);
  }
};

let _socket;

io.on('connection', (socket) => {
  console.log('Client is connected');

  _socket = socket;
  // const sendMessage = setInterval(() => {
  //   io.emit(
  //     'sensorData',
  //     JSON.stringify({
  //       temperature: (Math.random() * 100 + 1).toFixed(2),
  //       humidity: (Math.random() * 100 + 1).toFixed(2),
  //       brightness: (Math.random() * 1023 + 1).toFixed(2),
  //       createdAt: new Date().toISOString(),
  //     })
  //   );
  // }, 5000);

  socket.on('disconnect', () => {
    console.log('Client is disconnected');
    // clearInterval(sendMessage);
  });
});

mqttClient.on('message', function (topic, message) {
  if (mqttClient.connected) {
    const messageObj = JSON.parse(message);
    console.log(`Received message from [${topic}]:`, messageObj);
    if (topic === 'esp8266/sensor') {
      saveSensorData(messageObj)
        .then((response) => {
          if (response.statusCode === 201) {
            _socket?.emit('sensorData', JSON.stringify(response?.data));
            // _socket?.emit(
            //   'sensorData',
            //   JSON.stringify({
            //     temperature: (Math.random() * 100 + 1).toFixed(2),
            //     humidity: (Math.random() * 100 + 1).toFixed(2),
            //     brightness: (Math.random() * 1023 + 1).toFixed(2),
            //     createdAt: new Date().toISOString(),
            //   })
            // );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
});

module.exports = sensorController;
