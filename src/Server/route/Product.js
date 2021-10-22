const express = require('express');
const router = express.Router();

const productController = require('../controller/ProductController');
router.get('/show', productController.show);
router.post('/create', productController.create);



module.exports=router;