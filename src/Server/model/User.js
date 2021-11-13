const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    tenNguoiDung: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    tenTaiKhoan: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_matKhau: {
      type: String,
      required: true,
    },
    vaiTro: {
      type: String,
      enum: ["user", "admin", "super-admin"],
      default: "user",
    },
    soDienThoai: { type: String },
    anhDaiDien: { type: String },
  },
  { timestamps: true }
);

userSchema.methods = {
  authenticate: async function (matKhau) {
    return await bcrypt.compare(matKhau, this.hash_matKhau);
  },
};

module.exports = mongoose.model("User", userSchema);