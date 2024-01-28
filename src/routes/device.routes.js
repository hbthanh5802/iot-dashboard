const express = require('express');

const router = express.Router();
const deviceController = require('../controllers/device.controller');

router.post('/', deviceController.createNew);

router.get('/', (req, res) => {
  res.json({
    message: 'Default GET in device router',
  });
});

module.exports = router;
