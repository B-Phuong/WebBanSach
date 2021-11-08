const express = require('express');
const router = express.Router();

const userController = require('../controller/UserController');
const hoaDonController = require('../controller/HoaDonController');
router.get('/purchase/:orderstatus', userController.getOrderByStatus);
router.get('/info/:id', userController.info);
router.put('/edit/:id', userController.edit); 
// router.delete('/delete/:id', userController.delete); 



module.exports=router;