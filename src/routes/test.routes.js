const express = require('express');
const router = express.Router();
// import Controller...
const TestControllers = require('../controllers/test.controller');

router.get('/', TestControllers.getFirstRequest);

module.exports = router;
