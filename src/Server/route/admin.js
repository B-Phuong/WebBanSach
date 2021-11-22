const express = require('express');
const router = express.Router();
const { validationBook, isRequestValidated } = require('../validators/value');
const multer = require("multer");
//const shortid = require("shortid");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/Server/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });

const adminController = require('../controller/AdminController');
const bookController = require('../controller/BookController');
router.post('/user/addStaff', adminController.addStaff);
router.put('/user/blockuser/:id', adminController.block);
router.get('/user/:id', adminController.find);
router.post('/user/:id', adminController.update);
router.get('/user/all', adminController.show);
router.post('/book', /*upload.single('hinhAnh'),*/ validationBook, isRequestValidated, bookController.create);

module.exports = router;