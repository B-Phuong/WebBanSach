const Mongoose = require('mongoose');
// const Genres = require('./Genres')
const Schema = Mongoose.Schema;

const Category = new Schema({
  tenDanhMuc: {
    type: String,
    required: true,
    trim: true
  },
  // slug: {
  //     type: String, 
  //     required: true, 
  //     unique: true
  // },
  categoryImage: { type: String },
  // parentId: {
  //   type: String,
  // },
  danhMucCon: { type: Array, ref: 'Genres' }
  // createdBy: {
  //   type: Mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },

}, { timestamps: true });
module.exports = Mongoose.model('Category', Category)