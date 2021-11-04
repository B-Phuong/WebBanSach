const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const account = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
      },
    password: {
        type: String,
        required: true,
      },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
},{timestamps: true});

const AccountModel = mongoose.model('Account', account);

module.exports = AccountModel