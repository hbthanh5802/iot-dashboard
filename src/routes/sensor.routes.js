const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensor.controller');

router.post('/create', sensorController.createNew);

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Default GET in sensor router',
  });
});

module.exports = router;
