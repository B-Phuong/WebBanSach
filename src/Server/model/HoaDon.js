const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const hoadon  = new Schema({
    ngayDatHang:  {type: Date},
    trangThai: {type: String, maxlength: 255},
    tongTien:  {type: Number},
    donViGiaoHang:  {type: String},
    maKhachHang:{type: String},
    chiTietHoaDon:[{
        tenSach: {type: String},
        soLuong:{type: Number},
        tongTien:{type:Number}
    }]

},{timestamps: true});
module.exports = Mongoose.model('HoaDon', hoadon)