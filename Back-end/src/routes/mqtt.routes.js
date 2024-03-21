const express = require('express');
const { mqttClient } = require('../utils/mqttClient');

const router = express.Router();

router.get('/status', (req, res, next) => {
  const response = {
    statusCode: 200,
    message: 'MQTT is already connected',
    data: { isConnected: true },
  };
  if (!mqttClient.connected) {
    response.message = 'MQTT is disconnected';
    response.data.isConnected = false;
  }
  return res.status(200).json(response);
});

module.exports = router;
