const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Genres = require('./Genres')
const Category  = new Schema({
    tenDanhMuc: {
                type: String, 
                required: true, 
                trim: true
            },
    slug: {
        type: String, 
        required: true, 
        unique: true
    },
    categoryImage: { type: String },
    parentId: {
      type: String,
    },
    createdBy: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }

},{timestamps: true});
module.exports = Mongoose.model('Category', Category)