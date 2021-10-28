const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const User = new Schema({
    id:  {type: String, maxlength: 255},
    tenKhachHang: {type: String},
    gioiTinh:  {type: String},
    sDT:  {type:String, maxlength: 11},
    vaiTro:{type:String, maxlength: 100},
    matKhau:{type:String, maxlength: 40},
    diaChi: {type: String, maxlength: 255},


},{timestamps: true});
module.exports = Mongoose.model('User', User)