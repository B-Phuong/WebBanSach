const express = require('express');
const router = express.Router();

const SignUpController = require('../controller/SignUpController');

router.post('/createaccount', SignUpController.create);

module.exports=router;