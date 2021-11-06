const Account = require('../model/Account');
const bcrypt = require('bcrypt');
const { mutipleMongoseToObject } = require('../util/mongoose');

class SignUpController{
async create(req, res) {
    const{tenDangNhap, matKhau:plainTextPassword} = req.body

    if(!tenDangNhap || typeof tenDangNhap !=='string'){
        return res.json({status:"error", error:"Tên đăng nhập không hợp lệ"})
    }
    if(!plainTextPassword || typeof plainTextPassword !=='string'){
        return res.json({status:"error", error:"Mật khẩu không hợp lệ"})
    }
    if(plainTextPassword.length<5){
        return res.json({status:"error", error:"Mật khẩu phải trên 6 kí tự"})
    }
    const matKhau = await bcrypt.hash(plainTextPassword, 10)
    try{
        const response = await Account.create({
            tenDangNhap,
            matKhau
        })
        console.log('Tài khoản được tạo thành công', response)
    }catch(error){
        if(error.code === 11000){
        return res.json({status:'error', error:'Tài khoản đã tồn tại'})
        }
        throw error
    }
    // console.log(await bcrypt.hash(matKhau, 10))

    res.json({status:'ok'})
}
}
module.exports = new SignUpController();