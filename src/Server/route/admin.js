const express = require('express');
const router = express.Router();
const { validationBook, isRequestValidated } = require('../validators/value');
const { superAdminMiddleware } = require('../common-middleware');
const { requireSignin } = require('../common-middleware');
const multer = require("multer");
//const shortid = require("shortid");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/Server/uploads")//)//"src/Server/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });

const adminController = require('../controller/AdminController');
const bookController = require('../controller/BookController');
router.post('/user/addStaff', requireSignin, superAdminMiddleware, adminController.addStaff);
router.put('/user/blockuser/:id', requireSignin, superAdminMiddleware, adminController.block);
router.get('/user/:id', requireSignin, superAdminMiddleware, adminController.find);
router.post('/user/:id', requireSignin, superAdminMiddleware, adminController.update);
router.get('/user/all', requireSignin, superAdminMiddleware, adminController.show);
router.post('/book', requireSignin, superAdminMiddleware, upload.single('hinhAnh'), validationBook, isRequestValidated, bookController.create);

module.exports = router;