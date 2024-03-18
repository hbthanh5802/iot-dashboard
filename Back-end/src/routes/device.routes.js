const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device.controller');

router.post('/create', deviceController.createNew);

router.put('/action/update', deviceController.updateDeviceStatus);
router.put('/action', deviceController.updateDevice);

router.get('/action', deviceController.getDataAction);

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Default GET in device router',
  });
});

module.exports = router;
