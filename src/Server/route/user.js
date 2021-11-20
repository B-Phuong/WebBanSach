const express = require('express');
const router = express.Router();

const userController = require('../controller/UserController');
const { validationOders, isRequestValidated } = require('../validators/value');
const hoaDonController = require('../controller/HoaDonController');
router.get('/purchase/:orderstatus', userController.getOrderByStatus);
router.post('/orders',validationOders,isRequestValidated, userController.orderBooks);
router.get('/:id', userController.info);
router.put('/:id', userController.edit); 
// router.delete('/delete/:id', userController.delete); 



module.exports=router;