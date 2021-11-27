const User = require("../model/User");
const Book = require("../model/Book");
const { mutipleMongoseToObject } = require("../util/mongoose");
const mongoose = require("mongoose");
class CartController {
  // function

  // thêm sản phẩm vào giỏ hàng
  //[PUT] /cart/:iduser
  async addBookToCart(req, res, next) {
    var { maSach, soLuong } = req.body;
    let userId = req.user._id;
    // kiểm tra mã sách có phải ObjectId (String is of 12 bytes or a string of 24 hex)
    // nếu không kiểm tra thì sẽ bị treo khi gửi request findById khi sai điều kiện: "String is of 12 bytes or a string of 24 hex "
    if (!mongoose.isValidObjectId(maSach)) {
      return res
        .status(400)
        .json({ message: "Mã sách Sai định dạng ObjectId" });
    }

    await User.findById({ _id: userId }) // sau này có token thì sữa lại lấy user từ token
      .then(async (user) => {
        if (!user)
          return res.status(404).json({
            status: 404,
            message: "không tìm thấy Id User",
          });
        else {
          // nếu giỏ hàng chưa có thì khởi tạo
          var newCart;
          if (!user.gioHang) newCart = [];
          else newCart = user.gioHang;
          //kiểm tra nếu sản phẩm có ở giỏ hàng trước rồi thì cập nhật số lượng
          // if(user.gioHang[id])
          var isItemExist = user.gioHang.some((item, index) => {
            return item.maSach === maSach;
          });
          if (isItemExist) {
            // item đã có trong giỏ hàng trước đó --> cập nhật số lượng
            var findBookInCart = user.gioHang.filter((item, index) => {
              return item.maSach === maSach;
            });
            //console.log('findbook',findBookInCart)
            // kiểm tra còn số sách trong giỏ hàng sau thêm có vượt số lượng hiện có của sách không
            await Book.findById(maSach)
              .then(async (data) => {
                if (!data) {
                  return res
                    .status(400)
                    .json({ message: "Id Sách không tồn tại" });
                } else {
                  // tiến hành cập nhật số lượng trong giỏ
                  let soLuongBanDauTrongGio = findBookInCart[0].soLuong;
                  var SoLuongCanThemVaoGio = soLuong;
                  if (
                    data.soLuongConLai >=
                    soLuongBanDauTrongGio + SoLuongCanThemVaoGio
                  ) {
                    // đủ số lượng --> tiến hành cập nhật giỏ hàng
                    // cập nhật lại số lượng
                    for (const item of newCart) {
                      if (item.maSach === maSach) {
                        item.tenSach = data.tenSach;
                        item.hinhAnh = data.hinhAnh;
                        item.giaGoc = data.giaTien;
                        item.giamGia = data.giamGia;
                        item.soLuong =
                          soLuongBanDauTrongGio + SoLuongCanThemVaoGio;
                        item.tongTien =
                          (item.giaGoc - (item.giaGoc * item.giamGia) / 100) *
                          item.soLuong;
                        break;
                      }
                    }
                    await User.updateOne({ _id: userId }, { gioHang: newCart })
                      .then((cartUpdated) => {
                        return res
                          .status(200)
                          .json({
                            message: "Số lượng sách đã cập nhật trong giỏ hàng",
                            newCart,
                          });
                      })
                      .catch((err) => {
                        return res.status(400).json({ err });
                      });
                  } else {
                    res
                      .status(400)
                      .json({
                        message: "Không đủ số lượng",
                        soLuongCoTheThem:
                          data.soLuongConLai - soLuongBanDauTrongGio,
                      });
                  }
                }
              })
              .catch((err) => {
                return res.status(500).json(err);
              });
          } else {
            // thêm mới vào giỏ hàng
            // kiểm tra còn số sách trong giỏ hàng sau thêm có vượt số lượng hiện có của sách không
            await Book.findById(maSach)
              .then(async (data) => {
                if (!data) {
                  return res
                    .status(400)
                    .json({ message: "Id Sách không tồn tại" });
                } else {
                  // tiến hành thêm mới sách vào giỏ hàng
                  if (data.soLuongConLai >= soLuong) {
                    console.log("bat");
                    // đủ số lượng --> tiến hành cập nhật giỏ hàng
                    // cập nhật lại số lượng
                    let itemNeedAddtoCart = {
                      maSach: maSach,
                      tenSach: data.tenSach,
                      hinhAnh: data.hinhAnh,
                      giaGoc: data.giaTien,
                      giamGia: data.giamGia,
                      soLuong: soLuong,
                      tongTien:
                        (data.giaTien - (data.giaTien * data.giamGia) / 100) *
                        soLuong,
                    };
                    console.log("item", itemNeedAddtoCart);
                    newCart.push(itemNeedAddtoCart);

                    await User.updateOne({ _id: userId }, { gioHang: newCart })
                      .then((cartUpdated) => {
                        return res
                          .status(200)
                          .json({
                            message: "thêm thành công vào giỏ hàng",
                            newCart,
                          });
                      })
                      .catch((err) => {
                        return res.status(400).json({ err });
                      });
                  } else {
                    res
                      .status(400)
                      .json({
                        message: "Không đủ số lượng",
                        soLuongCoTheThem: data.soLuongConLai,
                      });
                  }
                }
              })
              .catch((err) => {
                return res.status(500).json(err);
              });
            res.send("từ anh trai");
          }
        }
      })
      .catch((err) => res.status(400).json({ message: err }));
  }

  async getCart(req, res, next) {
    let userId = req.user._id;
    await User.find({ _id: userId })
      .then((data) => {
        if (data.length != 0) res.status(200).json({cartItems: data[0].gioHang});
        else {
          res.status(200).json({ message: "Không tìm thấy user" });
        } //
      })
      .catch((err) => {
        res.status(500).json({ message: err || "Lỗi hệ thống" });
      });
  }
}

module.exports = new CartController();
