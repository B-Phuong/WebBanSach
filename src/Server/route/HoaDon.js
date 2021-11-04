const express = require('express');
const router = express.Router();

const HoaDonController = require('../controller/HoaDonController');
<<<<<<< HEAD
=======
router.get('/', HoaDonController.show);
router.post('/taohoadon', HoaDonController.create);
router.put('/chapNhanHuy/:id', HoaDonController.acceptCancel);

>>>>>>> main

router.post('/taohoadon', HoaDonController.create);
router.put('/:id/duyetdon', HoaDonController.duyetdon)
router.put('/:id/huydon', HoaDonController.huydon)
router.get('/', HoaDonController.show);
module.exports=router;