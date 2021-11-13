const User = require("../model/User");
const Book = require("../model/Book");
const { mutipleMongoseToObject } = require("../util/mongoose");

class CartController {
  // thêm sản phẩm vào giỏ hàng
  //[PUT] /cart/:iduser
  async addBookToCart(req, res, next) {
  //   console.log(req.body.user._id.$oid);
  //   await User.findById({ _id: req.body.user._id.$oid }) // sau này có token thì sữa lại lấy user từ token
  //     .then((user) => {
  //       if (!user)
  //         return res.status(404).json({
  //           status: 404,
  //           message: "không tìm thấy Id User",
  //         });
          
  //       else {
  //         var book = {
  //           maSach: req.body.maSach,
  //           tenSach: req.body.tenSach,
  //           hinhAnh: req.body.hinhAnh,
  //           soLuong: req.body.soLuong,
  //           giaGoc: req.body.giaTien,
  //           giamGia: req.body.giamGia,
  //         };
  //         console.log(book);
  //         book.tongTien =
  //           (book.giaGoc - (book.giaGoc * book.giamGia) / 100) * book.soLuong;
  //         // if(!data.gioHang) // nếu giỏ hàng chưa có thì khởi tạo
  //         //   giohang = []
  //         var giohangnew;
  //         if (!user.gioHang) giohangnew = [];
  //         else giohangnew = user.gioHang;
  //         //kiểm tra nếu sản phẩm có ở giỏ hàng trước rồi thì cập nhật số lượng
  //         // if(user.gioHang[id])
  //         var isItemExist = user.gioHang.some((item, index) => {
  //           return item.maSach === book.maSach;
  //         });

  //         if (isItemExist) {
  //           // nếu đã có trong giỏ hàng rồi thì cập nhật số lượng
  //           var findBookInCart = user.gioHang.filter((item, index) => {
  //             return item.maSach === book.maSach;
  //           });
  //           var soLuongBanDauTrongGio = findBookInCart.soLuong;
  //           var SoLuongCanThemVaoGio = book.soLuong;

  //           Book.findById({ _id: book.maSach }).then((data) => {
  //             if (!data) {
  //               res.status(400).json({ message: "Lỗi khi tìm sách"});
  //             } else {
  //               if ( // kiểm tra số lượng cần thêm vào đủ không
  //                 data.soLuongConLai >=
  //                 SoLuongCanThemVaoGio + soLuongBanDauTrongGio
  //               ) {
  //                 // đủ thì thêm
  //                 var updateNumberBook = new Promise(function (resolve, reject) {
  //                   Book.updateOne({ _id: book.maSach },{soLuongConLai: data.soLuongConLai - SoLuongCanThemVaoGio}).then((result) => {
  //                     resolve(result)
  //                   }).catch((err) => {reject(err)});
  //                 });
  //                 var newCart = user.gioHang.map(x=> {return x})
  //                 // cập nhật lại số lượng
  //                 for(index in newCart){
  //                   if(newCart[index].maSach == book.maSach)
  //                   {
  //                     newCart[index].soLuong = soLuongBanDauTrongGio + SoLuongCanThemVaoGio
  //                     newCart[index].tongTien = (newCart[index].giaTien - (newCart[index].giaTien * newCart[index].giamGia) / 100) * newCart[index].soLuong;
  //                     break
  //                   } 
                    
  //                 }

  //                 var updateBookInCart = new Promise(function (resolve, reject) {
  //                   User.updateOne({ _id: req.body.user._id.$oid },{gioHang:newCart}).then((updated) => {
  //                     resolve(updated)
  //                   });
  //                 });

  //                 Promise.all([updateNumberBook,updateBookInCart])
  //                     .then((bookupdated,cartupdated)=>{
  //                       res.status(200).json({ message: 'thêm thành công vào giỏ hàng'})
  //                     })
  //                     .catch(err => {return res.status(500).json({ message: err})})
                      
  //               } 
  //               else {
  //                 res
  //                   .status(400)
  //                   .json({
  //                     message:
  //                       "Số lượng sách không đủ để thêm vào giỏ hàng, vui lòng thử lại",
  //                   });
  //               }
  //             }
  //           }//49
  //         }// 41
          
  //     }
  //   }
  //     .catch((err) => res.status(400).json({ message: err }));
  }
}

module.exports = new CartController();
