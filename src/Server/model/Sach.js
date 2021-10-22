const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Sach = new Schema({
    tenSach:  {type: String, maxlength: 255},
    loaiSach:  {type: String, maxlength: 255},
    danhmucSach:  {type: String, maxlength: 255},
    nhaXuatBan: {type: String, maxlength: 255},
    giaTien:  {type: String},
    giamGia:  {type: String},
    moTa:  {type: String, maxlength: 255},
    soLuongConLai: {type: String}

},{timestamps: true});
module.exports = Mongoose.model('Sach', Sach)