const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const hoadon  = new Schema({
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ngayDatHang:  {type: Date, default: Date.now},
    trangThai: {type: String, maxlength: 255},
    daDuyet:{type:Boolean},
    daHuy:{type:Boolean},
    tongTien:  {type: Number},
    donViGiaoHang:  {type: String},
    soLuong:  {type: Number}

},{timestamps: true});
module.exports = Mongoose.model('HoaDon', hoadon)