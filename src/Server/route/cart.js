const express = require('express');
const router = express.Router();
const { validationCart, isRequestValidated } = require('../validators/value');
const cartController = require('../controller/CartController');
router.put('/', validationCart,isRequestValidated, cartController.addBookToCart);


module.exports=router;