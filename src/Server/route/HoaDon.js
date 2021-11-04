const express = require('express');
const router = express.Router();

const HoaDonController = require('../controller/HoaDonController');

router.get('/', HoaDonController.show);
router.put('/chapNhanHuy/:id', HoaDonController.acceptCancel);
router.post('/taohoadon', HoaDonController.create);
router.put('/duyetdon/:id', HoaDonController.duyetdon)
router.get('/', HoaDonController.show);
module.exports=router;