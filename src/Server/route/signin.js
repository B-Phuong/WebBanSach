const express = require('express');
const router = express.Router();

const SignInController = require('../controller/SignInController');
router.post('/dangnhap', SignInController.dangnhap);
router.post('/doimatkhau', SignInController.doimatkhau);
module.exports=router;