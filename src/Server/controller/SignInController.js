const { mutipleMongoseToObject } = require('../util/mongoose');

class SignInController{

    find(req, res){
        var username = req.body.username
        var password = req.body.password
        AccountModel.findOne({
            username:username,
            password:password
        })
        .then(data=>{
            if(data){
                res.json('Đăng nhập thành công')
            }else{
                res.status(300).json('Account khong dung')
            }
        })
        .catch(err=>{
            res.status(500).json('Có lỗi bên server')
        })

    }
}
module.exports = new SignInController();