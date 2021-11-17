const express = require('express');
const { getCategories } = require('../controller/CategoryController');
const router = express.Router();
const CategoryController = require('../controller/CategoryController');
const {
    requireSignin,
    adminMiddleware,
    superAdminMiddleware,
  } = require("../common-middleware");

router.post('/create',requireSignin, adminMiddleware, CategoryController.addCategory)
router.get('/getcategories',requireSignin, adminMiddleware, CategoryController.getCategories);
router.post('/delete',requireSignin, adminMiddleware, CategoryController.deleteCategories);

module.exports=router;