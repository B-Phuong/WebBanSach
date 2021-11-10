const express = require('express');
const router = express.Router();

const AuthController = require('../controller/AuthController');
router.post('/dangnhap', AuthController.dangnhap);
router.post('/doimatkhau', AuthController.doimatkhau);
router.get('/dangxuat',AuthController.dangxuat);
router.post('/dangky', AuthController.dangky);

module.exports=router;