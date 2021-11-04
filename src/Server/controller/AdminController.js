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
    const id = req.params.id;

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
    const id = req.params.id;

    User.findOne({ maNguoiDung: req.params.maNguoiDung })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot block with userId ${id}. Maybe id is wrong`,
          });
        } else {
          res.send({
            message: "User was blocked!",
          });
        }
      })
      .catch(next);
  }

  // tạo tài khoản nhân viên
  // khóa tài khoản user
  addStaff(req, res, next) {
    // validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be emtpy!" });
      return;
    }

    // new user
    const user = new User({
      tenUser:  req.body.tenUser,
      sDT:  req.body.sDT,
      diaChi:  req.body.diaChi,
      gioHang:  req.body.gioHang,
      gioiTinh:  req.body.gioiTinh,
    });

    // lưu vào database
    user
      .save()
      .then((data) => {
        // new account
        const account = new Account({
          tenDangNhap: req.body.tenDangNhap,
          matKhau: req.body.matKhau,
          maNguoiDung: data['id'],
          vaiTro: 'nhân viên',
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
}

module.exports = new AdminController();
