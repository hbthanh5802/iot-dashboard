const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device.controller');

// GET data action
router.get('/action', deviceController.getDataAction);
// DELETE data action
router.delete('/action/delete', deviceController.deleteDataAction);
// CREATE a new device
router.post('/create', deviceController.createNew);
// UPDATE a device status
router.put('/update-status', deviceController.updateDeviceStatus);
// UPDATE a device
router.put('/update', deviceController.updateDevice);
// GET a device info
router.get('/:deviceId', deviceController.getDevice);
//
router.get('/', deviceController.getAll);

module.exports = router;
