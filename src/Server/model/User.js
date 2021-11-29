const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    tenNguoiDung: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    tenTaiKhoan: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_matKhau: {
      type: String,
      required: true,
    },
    vaiTro: {
      type: String,
      enum: ["user", "admin", "super-admin"],
      default: "user",
    },
    diaChi: { type: String },
    soDienThoai: { type: String },
    anhDaiDien: { type: String },
    gioHang: [
      {
        maSach: { type: String, require: true },
        tenSach: { type: String, require: true },
        hinhAnh: { type: String, require: true },
        soLuong: { type: Number, require: true },
        soLuongConLai: { type: Number, require: true },
        tongTien: { type: Number, default: 0 },
        giaGoc: { type: Number, require: true },
        giamGia: { type: Number, require: true },
      },
    ],
    daXoa: { type: Boolean },
  },
  { timestamps: true }
);

userSchema.methods = {
  authenticate: async function (matKhau) {
    return await bcrypt.compare(matKhau, this.hash_matKhau);
  },
};

// const user = new Schema({
//     tenNguoiDung:  {type: String, maxlength: 50},
//     gioiTinh:  {type: Boolean},
//     sDT: {type: String, maxlength: 15},
//     diaChi:  {type: String, require:[true, "Bạn chưa nhập địa chỉ"]},
// gioHang:[{
//     maSach: {type: String , require:true},
//     tenSach:{type: String, require:true},
//     hinhAnh:{type: String, require:true},
//     soLuong: {type: Number, require:true},
//     tongTien: {type: Number,default:0},
//     giaGoc: {type: Number, require:true},
//     giamGia: {type: Number, require:true},
// }],
//     tenDangNhap: {type: String},
//     matKhau: {type: String},
//     vaiTro: {type: String},
//     conHoatDong: {type: Boolean, default: true},
// },{timestamps: true});
// module.exports = Mongoose.model('User', user)

module.exports = mongoose.model("User", userSchema);
