const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const hoadon  = new Schema({
<<<<<<< HEAD
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ngayDatHang:  {type: Date, default: Date.now},
=======
    ngayDatHang:  {type: Date},
>>>>>>> main
    trangThai: {type: String, maxlength: 255},
    daDuyet:{type:Boolean},
    daHuy:{type:Boolean},
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