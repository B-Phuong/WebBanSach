const express = require('express');
const router = express.Router();

const userController = require('../controller/UserController');
router.get('/info/:id', userController.info);
// router.put('/edit/:bidanh', userController.edit); 
// router.delete('/delete/:id', userController.delete); 
router.get('/:id', productController.find);
router.post('/:id', productController.update);
router.get('/all', productController.show);



module.exports=router;