const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Publisher = require('./Publisher')
const KindOfBook = require('./KindOfBook')

const Book = new Schema({
    tenSach:  {type: String, maxlength: 255, unique: true, require:[true, 'Nhập tên sách']},
    // // biDanh: {type: String,  slug:'tenSach', unique: true},
    // loaiSach:  {type: String, maxlength: 255},
    // danhmucSach:  {type: String, maxlength: 255},
     hinhAnh:{type: String},
    danhGia: {type: Number},
    giaTien:  {type: Number, require:[true, "Hãy nhập giá tiền"]},
    giamGia:  {type: Number},
    moTa:  {type: String},
    maNhaXuatBan:{
        type: String,
        required: [true, "Chưa chọn nhà xuất bản"],
        ref: Publisher,
      },
    maTheLoai:{
        type: String,
        required: [true, "Chưa chọn thể loại sách"],
        ref: KindOfBook,
      },
    soLuongConLai: {type: Number, require:[true, "Chưa nhập số lượng"]},
    phanHoi: [{
        idUser:  {type: String},
        xepHang:  {type: Number},
        binhLuan: {type: String},
    }]

},{timestamps: true});
module.exports = Mongoose.model('Book',Book)