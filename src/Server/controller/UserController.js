const User = require("../model/User");
const Book = require("../model/Book");

const Bill = require("../model/Bill");

class UserController {
  // với re là reqiure và res là response
  //[GET] /user/info
  //Xem thông tin cá nhân
  info(req, res) {
    User.find({ _id: req.params.id })
      .select("-vaiTro -matKhau")
      .then((data) => {
        // if (data)
        res.status(200).json(data);
        // else res.status(400).json({ message: 'Không tìm thấy thông tin người dùng' })
      })
      .catch((err) => {
        res.status(500).json({
          message: "Không tìm thấy thông tin người dùng" || "Lỗi hệ thống",
        });
      });
  }
  //[GET] /user/edit:id
  edit(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body)
      .then((data) => {
        //if (data)
        res.status(200).json({ message: "Đã cập nhật" });
        // else res.status(500).json({ message: 'Vui lòng thử lại' });
      })
      .catch((err) => {
        res.status(500).json({
          message:
            "Không thể tìm thấy sách bạn muốn chỉnh sửa" || "Lỗi hệ thống",
        });
      });
  }

  // xem đơn hàng theo trạng thái (hiện thiếu xem đơn hàng theo user, tạm hiện tất cả đơn hàng theo trạng thái)
  // [GET] /user/purchase/:oderstatus
  // test --> http://localhost:3000/user/purchase/%C4%91ang%20giao
  getOrderByStatus(req, res, next) {
    console.log(req.params.orderstatus);
    Bill.find({ trangThai: req.params.orderstatus })
      .then((oders) => {
        res.send({
          status: 200,
          data: oders,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  // đặt mua sách
  // [POST] /user/orders
 
}

module.exports = new UserController();
