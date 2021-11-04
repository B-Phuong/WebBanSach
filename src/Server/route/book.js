const express = require('express');
const router = express.Router();

const bookController = require('../controller/BookController');
router.get('/show', bookController.show);
router.post('/create', bookController.create);
router.put('/edit/:id', bookController.edit); 
router.delete('/delete/:id', bookController.delete); 
router.get('/filter/:id', bookController.filter); 



module.exports=router;