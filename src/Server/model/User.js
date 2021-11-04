const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const giohang = new Schema({
    maSach : {type: String},
    tenSach : {type: String},
    hinhAnh : {type: String},
    soLuong : {type: Number, default: 0},
    tongTien : {type: Number, default: 0}
})

const user = new Schema({
    tenUser:  {type: String, maxlength: 50},
    sDT: {type: String, maxlength: 15},
    diaChi:  {type: String},
    gioHang: [giohang],
    gioiTinh:  {type: Boolean},
},{timestamps: true});
module.exports = Mongoose.model('User', user)

