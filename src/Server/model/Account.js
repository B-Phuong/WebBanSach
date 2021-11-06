const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const account = new Schema({


    tenDangNhap: {type: String, unique: true},
    matKhau: {type: String},
    maNguoiDung: {type: String},
    vaiTro: {type: String},
    conHoatDong: {type: String, default: true},


},{timestamps: true});

const AccountModel = mongoose.model('Account', account);

module.exports = AccountModel