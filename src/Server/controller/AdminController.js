const User = require("../model/User");
const Account = require("../model/Account");
const { mutipleMongoseToObject } = require("../util/mongoose");

class AdminController {
  // với re là require và res là response
  //[GET] /user/show
  show(req, res, next) {
    User.find({})
      .then((data) => res.json(data))
      .catch(next);
  }

  //[Get] /User/:id
  find(req, res, next) {
    if (req.query.id) {
      const id = req.query.id;

      User.findById(id)
        .then((data) => {
          if (!data) {
            res.status(404).send({ message: "Not found user with id " + id });
          } else {
            res.send(data);
          }
        })
        .catch((err) => {
          res
            .status(500)
            .send({ message: "Erro retrieving user with id " + id });
        });
    } else {
      User.find()
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Error Occurred while retriving user information",
          });
        });
    }
  }

  // Update a new idetified user by user id
  update(req, res) {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "Data to update can not be empty" });
    }

    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot Update user with ${id}. Maybe user not found!`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Update user information" });
      });
  }

  // Delete a user with specified user id in the request
  delete(req, res) {
    const id = req.params._id;

    User.findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot Delete with id ${id}. Maybe id is wrong`,
          });
        } else {
          res.send({
            message: "User was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete User with id=" + id,
        });
      });
  }
  // khóa tài khoản user
  block(req, res, next) {
    Account.updateOne(
      { maNguoiDung: req.params.maNguoiDung },
      { conHoatDong: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot block with userId ${id}. Maybe id is wrong`,
          });
        } else {
          res.send({
            message: "User was blocked!",
            data,
          });
        }
      })
      .catch(next);
  }

  // tạo tài khoản nhân viên
  // khóa tài khoản user
  addStaff(req, res, next) {
    // kiểm tra nếu body thiếu 1 trong những thuộc tính bắt buộc thì thông báo
    if (!req.body.tenUser || !req.body.sDT || !req.body.tenDangNhap || !req.body.matKhau) { 
      res.status(400).send({ message: "tên user, số điện thoại, tên đăng nhập, mật khẩu không được bỏ trống" });
      return;
    }
    var abc = Account.find({ tenDangNhap: req.body.tenDangNhap })
      .then((user) => {
        if (user.length > 0) {
          return res.send({ message: "Tài khoản đã tồn tại !!" });
        } else {
          // new user
          const user = new User({
            tenUser: req.body.tenUser,
            sDT: req.body.sDT,
            diaChi: req.body.diaChi,
            gioHang: req.body.gioHang,
            gioiTinh: req.body.gioiTinh,
          });

          // lưu vào database
          user
            .save()
            .then((data) => {
              // new account
              const account = new Account({
                tenDangNhap: req.body.tenDangNhap,
                matKhau: req.body.matKhau,
                maNguoiDung: data["id"],
                vaiTro: "nhân viên",
                conHoatDong: true,
              });

              // lưu vào database
              account
                .save()
                .then((data) => {
                  res.send(data);
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while creating a create operation",
                  });
                });
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while creating a create operation",
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "có lỗi trong quá trình kiểm tra tài khoản! vui lòng thử lại",
        });
      });
  }
}

module.exports = new AdminController();
