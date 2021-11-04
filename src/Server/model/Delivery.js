const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;


const Delivery = new Schema({
  donViGiaoHang:String

},{timestamps: true});
module.exports = Mongoose.model('Delivery',Delivery)