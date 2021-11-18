const express = require('express');
const { getCategories } = require('../controller/CategoryController');
const router = express.Router();
const CategoryController = require('../controller/CategoryController');
const {
    requireSignin,
    adminMiddleware,
    superAdminMiddleware,
  } = require("../common-middleware");

router.post('/category/create',requireSignin, adminMiddleware, CategoryController.addCategory)
router.get('/category/getcategories',requireSignin, adminMiddleware, CategoryController.getCategories);
router.post('/category/delete',requireSignin, adminMiddleware, CategoryController.deleteCategories);

module.exports=router;