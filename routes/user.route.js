const userController = require('../controllers/user.controller');

const express = require('express');
const router = express.Router();


router.post('/register', userController.register);
router.post('/sign_in', userController.sign_in);
router.post('/profile', userController.loginRequired, userController.profile);

module.exports = router;
