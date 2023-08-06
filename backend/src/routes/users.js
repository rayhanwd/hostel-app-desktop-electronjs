const express = require('express');
const router = express.Router();
const userController = require('../users/user.controller');

/* GET users listing. */
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/info',userController.getUserByIdFromToken);
router.put('/update',userController.updateUserByIdFromToken);

module.exports = router;
