const express = require('express');
const authController = require('../controllers/auth.controllers');
const router = express.Router();

router
    .post('/register', authController.register)
    .post('/login/password', authController.login)
    .get("/logout", authController.logout);

module.exports = router;