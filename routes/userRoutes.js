const express = require('express');
const { signUp, login } = require('../controllers/UserController');

const router = express.Router();

// Route Sign-Up
router.post('/signup', signUp);

// Route Login
router.post('/login', login);

module.exports = router;
