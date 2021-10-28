const express = require('express');
const router = express.Router();

const adminController = require('../controller/AdminController');
router.get('/:id', adminController.find);
router.post('/:id', adminController.update);
router.get('/all', adminController.show);

module.exports=router;