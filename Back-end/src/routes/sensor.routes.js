const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensor.controller');

// GET data sensors
router.get('/data', sensorController.getDataSensor);
// CREATE a ne sensor
router.post('/create', sensorController.createNew);
// GET a sensor info
router.get('/:sensorId', sensorController.getSensor);
// Get all sensors
router.get('/', sensorController.getAll);

module.exports = router;
