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
        cb(null, "src/Server/uploads")// path.join(path.dirname(__dirname), "uploads"))// "src/Server/uploads"); //src/Server
    },
    filename: function (req, file, cb) {
        cb(null, /*Date.now() + "-" +*/ file.originalname);
    },
});
const upload = multer({ storage: storage });

const bookController = require('../controller/BookController');

router.get('/search/:theLoai', bookController.filterKindOfBook);

// router.post('/', upload.single('hinhAnh'), validationBook, isRequestValidated, bookController.create);
router.get('/top10', bookController.top10Books);
router.get('/:id', bookController.detail);
router.put('/:id', requireSignin, superAdminMiddleware,/* upload.single('hinhAnh'),*/ validationBook, isRequestValidated, bookController.edit);
router.delete('/:id', requireSignin, superAdminMiddleware, bookController.delete);
router.get('/', bookController.showAll);





module.exports = router;