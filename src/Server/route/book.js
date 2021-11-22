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

const bookController = require('../controller/BookController');

router.get('/search/:idTheLoai', bookController.filterKindOfBook);
router.get('/', bookController.showAll);
// router.post('/', upload.single('hinhAnh'), validationBook, isRequestValidated, bookController.create);
router.get('/top10', bookController.top10Books);
router.get('/:id', bookController.detail);
router.put('/:id', upload.single('hinhAnh'), validationBook, isRequestValidated, bookController.edit);
router.delete('/:id', bookController.delete);





module.exports = router;