const express = require('express');
const router = express.Router();
const { userMiddleware} = require('../common-middleware');
const { requireSignin} = require('../common-middleware');
const { validationCart, isRequestValidated } = require('../validators/value');
const cartController = require('../controller/CartController');
router.put('/',requireSignin,userMiddleware, validationCart,isRequestValidated, cartController.addBookToCart);

module.exports=router;