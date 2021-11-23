const Mongoose = require("mongoose");
const category = require('./Category')
const Schema = Mongoose.Schema;
const genres = new Schema(
  {
    tenDanhMucCon: { type: String, required: true },
    // maDanhMuc: {
    //   type: String,
    //   required: [true, "Chưa chọn nhà xuất bản"],
    //   ref: category,
    // },
  },
  { timestamps: true }
);
module.exports = Mongoose.model("Genres", genres);
