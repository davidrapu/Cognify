const express = require('express');
const { loginUser, registerUser } = require('../controllers/auth.controller');

const router = express.Router();

// @desc Get user from data of user details given
router.post('/login', loginUser);

// @desc Register user with details given
router.post('/register', registerUser);

module.exports = router;