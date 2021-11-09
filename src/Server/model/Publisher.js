const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Publisher  = new Schema({
    tenNhaXuatBan: {type: String, required: true}

},{timestamps: true});
module.exports = Mongoose.model('Publisher', Publisher)