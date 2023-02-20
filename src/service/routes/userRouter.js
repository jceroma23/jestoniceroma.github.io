const express = require('express');
const router = express.Router();
const signUpController = require('../controller/userAccountController')

router.post('/signup', signUpController.signUpController);
router.get('/getAllUser', signUpController.getAllUsers);
router.post('/login', signUpController.loginController);
module.exports = router;