// Import Service...
const TestServices = require('../services/test.service');

exports.getFirstRequest = async (req, res, next) => {
  try {
    req.body.title = 'First Request from TestControllers';
    const firstResponse = await TestServices.getFisrtRequest(req.body);
    res.json(firstResponse);
  } catch (error) {
    console.error('Error request:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
