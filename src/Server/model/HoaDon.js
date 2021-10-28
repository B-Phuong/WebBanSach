const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const hoadon  = new Schema({
    idUser:  {type: String},
    ngayDatHang:  {type: Date},
    trangThai: {type: String, maxlength: 255},
    tongTien:  {type: Number},
    donViGiaoHang:  {type: String},
    soLuong:  {type: Number}

},{timestamps: true});
module.exports = Mongoose.model('HoaDon', hoadon)