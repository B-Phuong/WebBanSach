const User = require("../model/User");
const Book = require("../model/Book");
const paypal = require('paypal-rest-sdk');
const Bill = require("../model/Bill");
const bcrypt = require("bcrypt");

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
        // console.log(req.body)     
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
  //[PUT] /user/:id/editPassword
  editPassword(req, res, next) {
    console.log(req.body)

    if (req.body.matKhauMoi === req.body.nhapLaiMatKhau) {
      const hashPassword = bcrypt.hashSync(req.body.matKhauMoi, 10);
      User.findByIdAndUpdate(req.params.id, { hash_matKhau: hashPassword })
        .then((data) => res.status(200).json({ message: 'Cập nhật thành công', data: data }))
        .catch((err) => {
          res.status(500).json({ message: 'Cập nhật thất bại' });
        })
    }
    else {
      res.status(500).json({ message: 'Mật khẩu chưa đồng nhất' });
    }



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

  // thanh toán  paypal
  // [POST] /user/pay
  async getPaypal(req, res) {
    // paypal.configure({
    //   'mode': 'sandbox', //sandbox or live
    //   'client_id': 'AVSsoXfkVjr4Onhha6mdXf2yqOJcgxI1qL4nan3KSJTz7rDfHoOKtSA-OHmxNnZbED1GEkOOpDjBejy0',
    //   'client_secret': 'EKKWhYhmNwIfyVhmNhNamNNk4Tz4gAeohafRWiAzhvsO8ZprgwbRXxFeke5b6mCD38wgVXI10H9c4q54'
    // });
    const IDuser = req.user._id;
    // console.log(IDuser)
    var items;
    User.find({ _id: IDuser })
      .then((cartUser) => {
        if (cartUser) {
          console.log('giỏ', cartUser[0].gioHang)
          //res.status(200).json({ 'cart': cartUser[0].gioHang })
          items = cartUser[0].gioHang;
          console.log('hàng', items)
          // var total = cartUser[0].tongTien
          var total = 0;
          cartUser[0].gioHang.forEach(
            (book, index) => {
              console.log('sách thứ', index, book)
              total += book.tongTien
              console.log('tiền', book.tongTien)
            }

            // (total +=
            //   (book.giaTien - (book.giaTien * book.giamGia) / 100) * items[index].soLuong)
          );
          console.log('tổng tiền', total)
          res.status(200).json({ total })
          //res.status(200).json({ 'giohang': items })
          // var total = 0;
          // for (i = 0; i < items.length; i++) {
          //   total += parseFloat(items[i].soLuong) * items[i].giaGoc * (1 - 0.01 * items[i].giamGia);
          // }
          // const create_payment_json = {
          //   "intent": "sale",
          //   "payer": {
          //     "payment_method": "paypal"
          //   },
          //   "redirect_urls": {
          //     "return_url": "http://localhost:3000/user/pay/success",
          //     "cancel_url": "http://localhost:3000/hoadon/taohoadon"
          //   },
          //   "transactions": [{
          //     "item_list": {
          //       "items": items
          //     },
          //     "amount": {
          //       "currency": "USD",
          //       "total": total.toString()
          //     },
          //     "description": "P"
          //   }]
          // };
          // paypal.payment.create(create_payment_json, function (error, payment) {
          //   if (error) {
          //     console.log('lỗi xảy ra')
          //     //res.render('cancle');
          //   } else {
          //     console.log('thành công')
          //     for (let i = 0; i < payment.links.length; i++) {
          //       if (payment.links[i].rel === 'approval_url') {
          //         res.status(200).json({ data: payment.links[i] })
          //         //res.redirect(payment.links[i].href);
          //       }
          //     }
          //   }
          // });
        }
        else
          res.status(400).json({ error: 'Lỗi hệ thống' })
      })
      .catch(err => res.status(500).json({ error: err }))



  }

}

module.exports = new UserController();
