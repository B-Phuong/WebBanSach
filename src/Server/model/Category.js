const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Genres = require('./Genres')
const Category  = new Schema({
    tenDanhMuc: {type: String, require:[true, "Tên danh mục bắt buộc"]}
   
},{timestamps: true});
module.exports = Mongoose.model('Category', Category)