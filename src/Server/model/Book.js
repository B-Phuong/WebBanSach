const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Publisher = require('./Publisher')
const genres = require('./Genres')

const Book = new Schema({
  tenSach: { type: String, maxlength: 255, unique: true, require: [true, 'Nhập tên sách'] },
  // // biDanh: {type: String,  slug:'tenSach', unique: true},
  // loaiSach:  {type: String, maxlength: 255},
  // danhmucSach:  {type: String, maxlength: 255},
  hinhAnh: { type: String },
  danhGia: { type: Number, default: 0 },
  giaTien: { type: Number, require: [true, "Hãy nhập giá tiền"] },
  giamGia: { type: Number },
  moTa: { type: String },
  maNhaXuatBan: {
    type: String,
    required: [true, "Chưa chọn nhà xuất bản"],
    ref: Publisher,
    trim: true,
  },
  maDanhMucCon: {
    type: String,
    required: [true, "Chưa chọn danh mục con"],
    ref: genres,
  },
  soLuongConLai: { type: Number, require: [true, "Chưa nhập số lượng"] },
  soLuongBan: { type: Number, default: 0 },
  phanHoi: [{
    idUser: { type: String },
    xepHang: { type: Number },
    binhLuan: { type: String },
  }],
  ISBN: { type: String },
  tacGia: { type: String, require: [true, "Hãy nhập tác giả"] },

}, { timestamps: true });
module.exports = Mongoose.model('Book', Book)