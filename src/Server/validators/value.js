const {check, validationResult} = require('express-validator');
exports.validationBook = [
    check('tenSach')
    .notEmpty()
    .withMessage('Nhập tên sách'),
    check('giaTien')
    .isNumeric()
    .withMessage('Giá tiền chỉ bao gồm số'),
    check('giaTien')
    .notEmpty()
    .withMessage('Bạn phải nhập giá tiền'),
    check('maNhaXuatBan')
    .notEmpty()
    .withMessage('Chưa chọn nhà xuất bản'),
    check('maDanhMucCon')
    .notEmpty()
    .withMessage('Chưa chọn mã danh mục con'), //,
    check('tacGia')
    .notEmpty()
    .withMessage('Hãy nhập tác giả') //,
]

exports.isRequestValidated =(req, res, next)=>{
    const errors =validationResult(req)
    if (errors.array().length >0){
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next();
}