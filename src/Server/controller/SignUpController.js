const Account = require('../model/Account');
const AccountModel = require('../model/Account');
const { mutipleMongoseToObject } = require('../util/mongoose');

class SignUpController{
create(req, res) {
    // kiểm tra validate request
    var username = req.body.username
    var password = req.body.password
    Account.findOne({
        username:username
    })

    .then(data=>{
        if(data){
            res.json('User này đã tồn')
        }else{
            return Account.create({
                username: username,
                password: password
            })
        }
    })
    .then(data=>{
        res.json('Tạo tài khoản thành công')
    })
    .catch(err=>{
        res.status(500).json('Tạo tài khoản thất bại')
    })
}
}
module.exports = new SignUpController();