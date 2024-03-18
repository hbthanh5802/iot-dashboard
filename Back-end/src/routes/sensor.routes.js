const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensor.controller');

router.post('/create', sensorController.createNew);

router.get('/', sensorController.getDataSensor);

module.exports = router;
