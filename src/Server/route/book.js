const express = require('express');
const router = express.Router();

const bookController = require('../controller/BookController');
router.get('/show', bookController.show);
router.post('/create', bookController.create);
router.put('/edit/:bidanh', bookController.edit); 
router.delete('/delete/:id', bookController.delete); 



module.exports=router;