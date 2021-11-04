const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Category  = new Schema({
    tenDanhMuc: {type: String}
   
},{timestamps: true});
module.exports = Mongoose.model('Category', Category)