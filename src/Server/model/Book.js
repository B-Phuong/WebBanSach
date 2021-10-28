const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
const Schema = Mongoose.Schema;
const User = require('./User')

Mongoose.plugin(slug)
const Book = new Schema({
    tenSach:  {type: String, maxlength: 255},
    biDanh: {type: String,  slug:'tenSach', unique: true},
    loaiSach:  {type: String, maxlength: 255},
    danhmucSach:  {type: String, maxlength: 255},
    nhaXuatBan: {type: String, maxlength: 255},
    giaTien:  {type: Number},
    giamGia:  {type: Number},
    moTa:  {type: String, maxlength: 255},
    soLuongConLai: {type: Number},
    phanHoi: [{
        idUser:  {type: String},
        xepHang:  {type: Number},
        binhLuan: {type: String}
    }]

},{timestamps: true});
module.exports = Mongoose.model('Book',Book)