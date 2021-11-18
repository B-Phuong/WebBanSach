const User = require("../model/User");
const Book = require("../model/Book");
const { mutipleMongoseToObject } = require("../util/mongoose");
const mongoose = require('mongoose')
class CartController {
  // function

  // thêm sản phẩm vào giỏ hàng
  //[PUT] /cart/:iduser
  async addBookToCart(req, res, next) {
    

    var { maSach, tenSach, hinhAnh, soLuong, giaTien, giamGia } = req.body;

    // kiểm tra mã sách có phải ObjectId (String is of 12 bytes or a string of 24 hex)
    // nếu không kiểm tra thì sẽ bị treo khi gửi request findById khi sai điều kiện: "String is of 12 bytes or a string of 24 hex "
     if(mongoose.isValidObjectId('')){         
      return  res.send("phai nha")
    }
    else console.log('khongphai')
    await User.findById('microsoft1232').then(x=> {
      res.status(200).json(x)
    })
    .catch(err => {err})
    console.log('abc')
    //kiểm tra mã sách hợp lệ Không
    // Book.findById('123')
    // .then((checkIdBook) => {
    //   return res.status(200).json({ message:checkIdBook})
    //   console.log(checkIdBook)
    //   if(!checkIdBook)
    //   return res.status(200).json({ message:'ăn lìn rồi'})
    // })
    // .catch(err => {messase: "Lỗi khi tìm mã sách"})

    


    // await User.findById({ _id: req.body.user._id.$oid }) // sau này có token thì sữa lại lấy user từ token
    //   .then((user) => {
    //     if (!user)
    //       return res.status(404).json({
    //         status: 404,
    //         message: "không tìm thấy Id User",
    //       });
    //       else {
    //         // nếu giỏ hàng chưa có thì khởi tạo
    //         var giohangnew;
    //         if (!user.gioHang) giohangnew = [];
    //         else giohangnew = user.gioHang;
    //         //kiểm tra nếu sản phẩm có ở giỏ hàng trước rồi thì cập nhật số lượng
    //         // if(user.gioHang[id])
    //         var isItemExist = user.gioHang.some((item, index) => {
    //           return item.maSach === maSach;
    //         });
    //         if (isItemExist) { // item đã có trong giỏ hàng trước đó --> cập nhật số lượng
    //           var findBookInCart = user.gioHang.filter((item, index) => {
    //             return item.maSach === maSach;
    //           });
    //           let soLuongBanDauTrongGio = findBookInCart[0].soLuong;
    //           var SoLuongCanThemVaoGio = soLuong;
    //           res.status(200).json(maSach)
    //           // // kiểm tra còn số sách trong giỏ hàng sau thêm có vượt số lượng hiện có của sách không
    //           // Book.findById({ _id: maSach }).then((data) => {
    //           //   if (!data) {
    //           //     res.status(400).json({ message: "Lỗi khi tìm sách"});
    //           //   } 
    //           //   else{
    //           //     res.status(200).json(data)
    //           //   }

    //           // })
    //         }


    //       }
            
    //   })
    //   .catch((err) => res.status(400).json({ message: err }));
  }
}

module.exports = new CartController();
