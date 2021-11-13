const express = require('express');
const router = express.Router();

const userController = require('../controller/UserController');
router.get('/:id', userController.info);
router.put('/:id', userController.edit); 
// router.delete('/delete/:id', userController.delete); 



module.exports=router;