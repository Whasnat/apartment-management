const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// POST /auth/login - User login
router.post('/login', authController.login);

module.exports = router;
