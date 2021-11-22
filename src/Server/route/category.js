const express = require('express');
const { getCategories } = require('../controller/OtherController');
const router = express.Router();
const OtherController = require('../controller/OtherController');
const {
  requireSignin,
  adminMiddleware,
  superAdminMiddleware,
} = require("../common-middleware");
router.get('/', OtherController.getAllCategories);
module.exports = router;