const Mongoose = require('mongoose');
// const Genres = require('./Genres')
const Schema = Mongoose.Schema;

const Category = new Schema({
  tenDanhMuc: {
    type: String,
    required: true,
    trim: true
  },
  danhMucCon: { type: Array, ref: 'Genres' }

}, { timestamps: true });
module.exports = Mongoose.model('Category', Category)