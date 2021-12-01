const { check, validationResult } = require("express-validator");
exports.validationBook = [
  check("tenSach").notEmpty().withMessage("Nhập tên sách"),
  check("giaTien").isNumeric().withMessage("Giá tiền chỉ bao gồm số"),
  check("giaTien").notEmpty().withMessage("Bạn phải nhập giá tiền"),
  check("maNhaXuatBan").notEmpty().withMessage("Chưa chọn nhà xuất bản"),
  check("maDanhMucCon").notEmpty().withMessage("Chưa chọn mã danh mục con"), //,
  check("tacGia").notEmpty().withMessage("Hãy nhập tác giả"), //,
];
exports.validationUser = [
  check("tenNguoiDung").notEmpty().withMessage("Nhập tên người dùng"),
  check("tenTaiKhoan").notEmpty().withMessage("Nhập tên tài khoản"),
  check("email").notEmpty().withMessage("Nhập email"),
  check("soDienThoai").isMobilePhone().withMessage("Số điện thoại phải có dạng số"),
  check('matKhau').notEmpty().withMessage("Mật khẩu không được thiếu")
  .isLength({ min: 8 })
  .withMessage('Mật khẩu phải trên 8 ký tự')
];

exports.validationEditPassword = [
  check("tenNguoiDung").notEmpty().withMessage("Nhập tên người dùng"),
  check("tenTaiKhoan").notEmpty().withMessage("Nhập tên tài khoản"),
  check("email").notEmpty().withMessage("Nhập email"),
  check("soDienThoai").isMobilePhone().withMessage("Số điện thoại phải có dạng số"),
  check('matKhau').notEmpty().withMessage("Vui lòng nhập mật khẩu cũ!")
  .isLength({ min: 8 })
  .withMessage('Mật khẩu phải trên 8 ký tự'),
  check('matKhauMoi').notEmpty().withMessage("Vui lòng nhập mật khẩu cũ!")
  .isLength({ min: 8 })
  .withMessage('Mật khẩu phải trên 8 ký tự'),
  
];


exports.validationCart = [
  check("maSach").notEmpty().withMessage("Thiếu mã sách"),
  check("soLuong").notEmpty().withMessage("Thiếu số lượng"),
  // .isFloat({ min: 0 })
  // .withMessage('Sai định dạng kiểu số ( giá trị số nguyên >= 0 )')
];

exports.validationOders = [
  check("listbooksOder").notEmpty().withMessage("Thiếu listbooksOder"),
  check("listbooksOder.*.maSach")
    .notEmpty()
    .withMessage("thiếu maSach trong listbookOder"),
  check("listbooksOder.*.soLuong")
    .notEmpty()
    .withMessage("thiếu soLuong trong listbookOder")
    .isFloat({ min: 1 })
    .withMessage("soLuong >= 1 "),
  check("diaChiGiaoHang").notEmpty().withMessage("Thiếu địa chỉ giao hàng"),
  check("phiGiaoHang")
    .notEmpty()
    .withMessage("Thiếu phiGiaoHang")
    .isFloat({ min: 0 })
    .withMessage("Phí giao hàng >= 0 "),
  check("soDienThoai").isMobilePhone().withMessage("Số điện thoại chưa hợp lệ"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
