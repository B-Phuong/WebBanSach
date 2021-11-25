const express = require('express');
const router = express.Router();
const { validationOders, isRequestValidated, validationUser } = require('../validators/value');
const { userMiddleware} = require('../common-middleware');
const { requireSignin } = require('../common-middleware');

const HoaDonController = require('../controller/HoaDonController');

router.put('/chapNhanHuy/:id', HoaDonController.acceptCancel);
router.post('/taohoadon',requireSignin,userMiddleware,validationOders, isRequestValidated, HoaDonController.orderBooks);
router.put('/duyetdon/:id', HoaDonController.duyetdon)
router.get('/', HoaDonController.show);
module.exports=router;