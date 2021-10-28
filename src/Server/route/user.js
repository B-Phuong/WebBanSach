const express = require('express');
const router = express.Router();

const userController = require('../controller/UserController');
router.get('/info/:id', userController.info);
// router.put('/edit/:bidanh', userController.edit); 
// router.delete('/delete/:id', userController.delete); 



module.exports=router;