const express = require('express');
const router = express.Router();

const cartController = require('../controller/CartController');
router.put('/:iduser', cartController.addBooks);


module.exports=router;