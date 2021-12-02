const { check, validationResult } = require('express-validator');
exports.validateSignupRequest = [
    check('tenNguoiDung')
        .notEmpty()
        .withMessage('Bạn phải nhập tên người dùng'),
    check('email')
        .isEmail()
        .withMessage('Bạn phải nhập đúng email'),
    check('matKhau')
        .isLength({ min: 8 })
        .withMessage('Mật khẩu phải trên 8 ký tự')
]
exports.validateSignupStaffRequest = [
    check('tenNguoiDung')
        .notEmpty()
        .withMessage('Bạn phải nhập tên người dùng'),
    check('email')
        .notEmpty()
        .withMessage('Email bắt buộc')
        .isEmail()
        .withMessage('Bạn phải nhập đúng email'),
    check('matKhau')
        .notEmpty()
        .withMessage('Mật khẩu bắt buộc')
        .isLength({ min: 8 })
        .withMessage('Mật khẩu phải trên 8 ký tự'),
    check('xacNhanMatKhau')
        .notEmpty()
        .withMessage('Xác nhận mật khẩu bắt buộc')

]
exports.validateSigninRequest = [
    check('email')
    .notEmpty()
    .withMessage('Vui lòng nhập đủ Email, mật khẩu'),
        // .isEmail()
        // .withMessage('Bạn phải nhập đúng email'),
    
    check('matKhau')
    .notEmpty()
    .withMessage('Mật khẩu không bỏ trống!')
]
exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}