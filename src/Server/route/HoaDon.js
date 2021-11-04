const express = require('express');
const router = express.Router();

const HoaDonController = require('../controller/HoaDonController');

router.post('/taohoadon', HoaDonController.create);
router.put('/:id/duyetdon', HoaDonController.duyetdon)
router.put('/:id/huydon', HoaDonController.huydon)
router.get('/', HoaDonController.show);
module.exports=router;