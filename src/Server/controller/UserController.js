
const User = require("../model/User");
const Book = require('../model/Book');

class UserController {
    // với re là reqiure và res là response
    //[GET] /user/info
    //Xem thông tin cá nhân
    info(req, res) {
        User.find({ _id: req.params.id })
            .select('-vaiTro -matKhau')
            .then(data => {
               // if (data)
                    res.status(200).json(data)
               // else res.status(400).json({ message: 'Không tìm thấy thông tin người dùng' })

            })
            .catch(err => {
                res.status(500).json({ message: "Không tìm thấy thông tin người dùng" || 'Lỗi hệ thống' });
            })
    }
    //[GET] /user/edit:id
    edit(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body)
            .then((data) => {
                //if (data)
                    res.status(200).json({ message: 'Đã cập nhật' });
               // else res.status(500).json({ message: 'Vui lòng thử lại' });
            }
            )
            .catch(err => {
                res.status(500).json({ message: "Không thể tìm thấy sách bạn muốn chỉnh sửa" || 'Lỗi hệ thống' });
            })
    }
}





module.exports = new UserController;

