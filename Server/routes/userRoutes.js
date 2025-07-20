const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);

module.exports = router;
