const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./User");
const bill = new Schema(
  {
    ngayDatHang: { type: Date, default: Date.now() },
    tongTien: { type: Number, required: true },
    maKhachHang: {
      type: String,
      required: [true, "Chưa có mã khách hàng"],
      ref: user,
    },
    chiTietHoaDon: [
      {
        maSach: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book"
        },
        tenSach: { type: String, required: true },
        soLuong: { type: Number, required: true },
        giamGia: { type: Number, default: 0 },
        giaTien: { type: Number, default: 0 },
        tongTienSauGiam: { type: Number, default: 0 },
      },
    ],
    orderStatus: [
      {
        type: {
          type: String,
          enum: ["ordered", "packed", "shipped", "delivered"],
          default: "ordered",
        },
        date: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    diaChiGiaoHang: { type: String, required: [true, "Chưa có địa chỉ giao hàng"] },
    phiGiaoHang: { type: Number, required: [true, "Chưa có phí giao hàng"] },
    soDienThoai: { type: String, required: [true, "Số điện thoại"] },
    daThanhToan: { type: Boolean, default: false, }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Bill", bill);
