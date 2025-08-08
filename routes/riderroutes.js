const express = require('express');
const router = express.Router();

// Import controllers
const { updateRiderController, getRiderController } = require('../controllers/ridercontroller');

// Define POST route to update rider location
router.post('/location', updateRiderController);

// Define GET route to get rider location by riderId
router.get('/location/:riderId', getRiderController);

module.exports = router;
