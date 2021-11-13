const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;



const user = new Schema({
    tenNguoiDung:  {type: String, maxlength: 50},
    gioiTinh:  {type: Boolean},
    sDT: {type: String, maxlength: 15},
    diaChi:  {type: String, require:[true, "Bạn chưa nhập địa chỉ"]},
    gioHang:[{
        maSach: {type: String , require:true},
        tenSach:{type: String, require:true},
        hinhAnh:{type: String, require:true},
        soLuong: {type: Number, require:true},
        tongTien: {type: Number,default:0},
        giaGoc: {type: Number, require:true},
        giamGia: {type: Number, require:true},
    }],
    tenDangNhap: {type: String},
    matKhau: {type: String},
    vaiTro: {type: String},
    conHoatDong: {type: Boolean, default: true},
},{timestamps: true});
module.exports = Mongoose.model('User', user)

