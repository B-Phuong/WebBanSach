const Account = require('../model/Account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const JWT_SECRET='gfsjdfhsduhfdsjfkjdshj&%^%&^$$^$fsdfdjuiheqr24nldsnfdslk'
const { mutipleMongoseToObject } = require('../util/mongoose');

class SignInController{

    async dangnhap(req, res){
        const{tenDangNhap, matKhau} = req.body

        const user = await Account.findOne({tenDangNhap}).lean()
        if(!user){
            return res.json({status:'error', error:'tên đăng nhập và mật khẩu không tồn tại'})
        }

        if(await bcrypt.compare(matKhau, user.matKhau)){
            //thành công
            const token = jwt.sign({
                id: user._id, 
                tenDangNhap: user.tenDangNhap,
                
            },JWT_SECRET
            )
            return res.json({status:'ok', data: token})
        }
        res.json({status:'error', error:'tên đăng nhập và mật khẩu không tồn tại'})
    }

    async doimatkhau(req, res){
        const { token, newpassword:plainTextPassword } = req.body
        if(!plainTextPassword || typeof plainTextPassword !=='string'){
            return res.json({status:"error", error:"Mật khẩu không hợp lệ"})
        }
        if(plainTextPassword.length<5){
            return res.json({status:"error", error:"Mật khẩu phải trên 6 kí tự"})
        }
        try{
            const user = jwt.verify(token, JWT_SECRET)
            const _id = user.id
            const password = await bcrypt.hash(plainTextPassword, 10)
            await Account.updateOne(
                { _id },
                {
                    $set: {matKhau: password}
                }
             )
        }catch(error){
            console.log(error)
            res.json({status:'error', error:';))'})
        }

        res.json({status:'ok'})
    }
    //GET
    dangxuat(req, res){
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
    }
}
module.exports = new SignInController();