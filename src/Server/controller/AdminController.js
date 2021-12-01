const User = require("../model/User");
const { mutipleMongoseToObject } = require("../util/mongoose");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
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

  //[Get] /staff
  listStaff(req, res, next) {
    User.find({ vaiTro: "admin", daXoa: { "$ne":'true'}  })
    .then(data => {
        if (data.length != 0)
          res.status(200).json(data)
        else {
          res.status(200).json({ message: 'Hiện không có sách nào' })
        }//
      }
      )
      .catch(err => {
        res.status(500).json({ message: err || 'Lỗi hệ thống' });
      })
  }
  // Update a new idetified user by user id
  update(req, res) {
    if (!req.body) {
      return res
        .status(400)
        .send({ error: "Data to update can not be empty" });
    }

    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            error: `Cannot Update user with ${id}. Maybe user not found!`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ error: "Error Update user information" });
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
            data: null,
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
        () => {
          res.status(500).send({
            message: `Cannot block with userId ${req.params.id}. Maybe id is wrong222`,
          })
        });
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
            .catch(() => {
              res.status(500).json({
                status: 500,
                message: "Lỗi thêm nhân viên, vui lòng thử lại!!!",
                data: null,
              })
            });
        }
      })
      .catch(() => {
        res.status(500).json({
          status: 500,
          message: "Lỗi thêm nhân viên, vui lòng thử lại!!!",
          data: null,
        })
      });
  }

  async signupStaff(req, res) {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (error) return res.status(400).json({ error })
      if (user)
        return res.status(400).json({
          error: "Tài khoản admin đã có người đăng ký",
        });

        const { tenNguoiDung, email, matKhau,soDienThoai, xacNhanMatKhau } = req.body;
        if(matKhau.trim() !== xacNhanMatKhau.trim()) {
          return res.status(400).json({error: "Mật khẩu xác nhận không khớp", })
        }
        const hash_matKhau = await bcrypt.hash(matKhau, 10);
        const _user = new User({
            tenNguoiDung,
            email,
            hash_matKhau,
            soDienThoai,
            tenTaiKhoan: shortid.generate(),
            vaiTro: 'admin'
        });


      _user.save((error, user) => {
        if (error) {
          return res.status(400).json({
            error: "Có gì đó không ổn",
          });
        }

        if (user) {
          return res.status(200).json({
            message: "Tài khoản admin được tạo thành công"
          });
        }
      });
    });
  }


deleteStaff(req, res) {
  const id = req.params.id;
  User.find({ _id: id })
      .then( async (data) => {
          console.log((data))
          if (data.length > 0)
            await User.findByIdAndUpdate({_id:id},{daXoa:true})
            .then( data => {return res.status(200).json({error:"Đã Xóa"})})
            .catch((err) => { return res.status(400).json({error:"Lỗi khi cập nhật"})})
          else {
              
            return res.status(400).json({ err: "Không tìm thấy user" })
          }
      })
      .catch(err => { res.status(500).json({ error: 'Kiểm tra lại id User' }) })

}

}

module.exports = new AdminController();
