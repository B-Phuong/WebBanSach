const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;



const user = new Schema({
    tenNguoiDung:  {type: String, maxlength: 50},
    gioiTinh:  {type: Boolean},
    sDT: {type: String, maxlength: 15},
    diaChi:  {type: String, require:[true, "Bạn chưa nhập địa chỉ"]},
    gioHang:[{
        maSach: {type: String},
        tenSach:{type: String},
        hinhAnh:{type: String},
        soLuong: {type: Number},
        tongTien: {type: Number}
    }],
    tenDangNhap: {type: String,  unique: true  },
    matKhau: {type: String},
    vaiTro: {type: String},
    conHoatDong: {type: Boolean, default: true},
},{timestamps: true});
module.exports = Mongoose.model('User', user)

