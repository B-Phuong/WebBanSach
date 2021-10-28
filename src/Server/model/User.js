const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const user = new Schema({
    tenUser:  {type: String, maxlength: 50},
    gioiTinh:  {type: Boolean},
    sDT: {type: String, maxlength: 15},
    diaChi:  {type: String},
    trangThai: {type: Boolean}
},{timestamps: true});
module.exports = Mongoose.model('User', user)

