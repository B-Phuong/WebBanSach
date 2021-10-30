const express = require('express');
const router = express.Router();

const SignInController = require('../controller/SignInController');
router.post('/dangnhap', SignInController.find);

module.exports=router;