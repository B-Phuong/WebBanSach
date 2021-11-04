const express = require('express');
const router = express.Router();

const HoaDonController = require('../controller/HoaDonController');
router.get('/', HoaDonController.show);
router.post('/taohoadon', HoaDonController.create);
router.put('/chapNhanHuy/:id', HoaDonController.acceptCancel);


module.exports=router;