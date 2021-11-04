const express = require('express');
const router = express.Router();

const adminController = require('../controller/AdminController');
router.post('/addStaff', adminController.addStaff);
router.put('/blockuser', adminController.block);
router.get('/:id', adminController.find);
router.post('/:id', adminController.update);
router.get('/all', adminController.show);

module.exports=router;