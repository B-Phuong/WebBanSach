const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'gfsjdfhsduhfdsjfkjdshj&%^%&^$$^$fsdfdjuiheqr24nldsnfdslk'
const { mutipleMongoseToObject } = require('../util/mongoose');

class AuthController {
    //dangky
    async dangky(req, res) {
        const{tenDangNhap, matKhau: plainTextPassword} = req.body

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
        const response = await User.create({
            tenDangNhap,
            matKhau,
            tenNguoiDung,
            gioiTinh,
            sDT,
            diaChi
        })
        console.log('Tài khoản được tạo thành công', response)
    }catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Tên đăng nhập đã có người sử dụng' })
		}
		throw error
    }
    // console.log(await bcrypt.hash(matKhau, 10))

    res.json({status:'ok'})
    }


    //dang nhap
    async dangnhap(req, res) {
        const { tenDangNhap, matKhau } = req.body

        const user = await User.findOne({ tenDangNhap }).lean()
        if (!user) {
            return res.json({ status: 'error', error: 'tên đăng nhập và mật khẩu không tồn tại' })
        }

        if (await bcrypt.compare(matKhau, user.matKhau)) {
            //thành công
            const token = jwt.sign({
                id: user._id,
                tenDangNhap: user.tenDangNhap,

            }, JWT_SECRET
            )
            return res.json({ status: 'ok', data: token })
        }
        res.json({ status: 'error', error: 'tên đăng nhập và mật khẩu không tồn tại' })
    }

    async doimatkhau(req, res) {
        const { token, newpassword: plainTextPassword } = req.body
        if (!plainTextPassword || typeof plainTextPassword !== 'string') {
            return res.json({ status: "error", error: "Mật khẩu không hợp lệ" })
        }
        if (plainTextPassword.length < 5) {
            return res.json({ status: "error", error: "Mật khẩu phải trên 6 kí tự" })
        }
        try {
            const user = jwt.verify(token, JWT_SECRET)
            const _id = user.id
            const password = await bcrypt.hash(plainTextPassword, 10)
            await User.updateOne(
                { _id },
                {
                    $set: { matKhau: password }
                }
            )
        } catch (error) {
            console.log(error)
            res.json({ status: 'error', error: ';))' })
        }

        res.json({ status: 'ok' })
    }
    //GET
    dangxuat(req, res) {
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
    }
}
module.exports = new AuthController();
