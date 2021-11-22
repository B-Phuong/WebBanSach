const express = require('express');
const router = express.Router();
const OtherController = require('../controller/OtherController');
// const {
//   requireSignin,
//   adminMiddleware,
//   superAdminMiddleware,
// } = require("../common-middleware");
router.get('/', OtherController.getAllPublisher);
module.exports = router;