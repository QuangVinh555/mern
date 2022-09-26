const express = require('express');
const router = express.Router();
const authController = require('../controller/AuthController')

const verifyToken = require('../middleware/auth')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/', verifyToken, authController.get);

module.exports = router;
