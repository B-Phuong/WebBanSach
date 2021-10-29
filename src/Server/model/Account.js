const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const account = new Schema({
    username: 'String',
    password: 'String'
},{timestamps: true});

const AccountModel = mongoose.model('Account', account);

module.exports = AccountModel