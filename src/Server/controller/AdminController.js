const User = require("../model/User");
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
  // [PUT] /admin/blockuer/:id
  block(req, res, next) {
    User.updateOne(
      { _id: req.params.id },
      { conHoatDong: false }
    )
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            status: 400,
            message: `Cannot block with userId ${req.params.id}. Maybe id is wrong`,
            data : null,
          });
        } else {
          res.send({
            status: 200,
            message: "User was blocked!",
            data: data,
          });
        }
      })
      .catch( 
        () =>{
        res.status(500).send({
        message: `Cannot block with userId ${req.params.id}. Maybe id is wrong222`,
      })});
  }

  // tạo tài khoản nhân viên
  // [POST] /admin/addstaff
  addStaff(req, res, next) {
    
    //kiểm tra các trường bắt buộc
    if (
      !req.body.tenNguoiDung ||
      !req.body.sDT ||
      !req.body.tenDangNhap ||
      !req.body.matKhau
    ) {
      res.status(400).send({
        status: 400,
        message:
          "tên user, số điện thoại, tên đăng nhập, mật khẩu không được bỏ trống",
        data: null,  
      });
      return;
    }

    // kiểm tra tài khoản đã tồn tại chưa
    User.find({ tenDangNhap: req.body.tenDangNhap })
      .then((user) => {
        if (user.length > 0) {
          return res.send({
            status: 400,
            message: "Tài khoản đã tồn tại !!",
            data: null,
          });
        } else {
          // tạo user
          const user = new User(req.body);
          user
            .save()
            .then((user) =>
              res.send({
                status: 200,
                message: "thêm nhân viên thành công",
                data: user,
              })
            )
            .catch(() =>{
              res.status(500).json({
                status: 500,
                message: "Lỗi thêm nhân viên, vui lòng thử lại!!!",
                data: null,
              })
            });
        }
      })
      .catch(() =>{
        res.status(500).json({
          status: 500,
          message: "Lỗi thêm nhân viên, vui lòng thử lại!!!",
          data: null,
        })
      } );
  }

  
}

module.exports = new AdminController();
