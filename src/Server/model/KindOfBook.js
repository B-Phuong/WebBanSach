const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const KindOfBook  = new Schema({
    tentheLoai: String,
    maDanhMuc: String

},{timestamps: true});
module.exports = Mongoose.model('KindOfBook', KindOfBook)