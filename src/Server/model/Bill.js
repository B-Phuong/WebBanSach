const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const user = require("./User");
const bill = new Schema(
  {
    ngayDatHang: { type: Date, default: Date.now() },
    trangThai: { type: String, default: "Chờ xác nhận" },
    tongTien: { type: Number, required: true },
    maKhachHang: {
      type: String,
      required: [true, "Chưa có mã khách hàng"],
      ref: user,
    },
    chiTietHoaDon: [
      {
        tenSach: { type: String, required: true },
        soLuong: { type: Number, required: true },
        tongTien: { type: Number, required: true },
      },
    ],
    diaChiGiaoHang: { type: String, required: [true, "Chưa có địa chỉ giao hàng"] },
    phiGiaoHang: { type: Number, required: [true, "Chưa có phí giao hàng"] },
  },
  { timestamps: true }
);
module.exports = Mongoose.model("Bill", bill);
