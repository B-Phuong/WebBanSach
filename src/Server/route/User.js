const express = require('express');
const router = express.Router();

const productController = require('../controller/UserController');
router.get('/:id', productController.find);
router.post('/:id', productController.update);
router.get('/all', productController.show);


module.exports=router;