const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const JWT_SECRET = 'aomalazadanobitadamvomomshizuka'
class AuthController {
    //signup
    async signup(req, res) {
        User.findOne({ email: req.body.email }).exec(async (error, user) => {
            if (user)
                return res.status(400).json({
                    error: "Tài khoản admin đã có người đăng ký",
                });

            const { tenNguoiDung, email, matKhau } = req.body;
            const hash_matKhau = await bcrypt.hash(matKhau, 10);
            const _user = new User({
                tenNguoiDung,
                email,
                hash_matKhau,
                tenTaiKhoan: shortid.generate(),
                vaiTro: 'admin'
            });

            _user.save((error, user) => {
                if (error) {
                    return res.status(400).json({
                        message: "Có gì đó không ổn",
                    });
                }

                if (user) {
                    return res.status(201).json({
                        error: "Tài khoản admin được tạo thành công"
                    });
                }
            });
        });
    }
    signin(req, res) {
        if(req.body.email.length == 0 && req.body.matKhau.length ==0)
        return res.status(400).json({
            error: 'Vui lòng nhập đủ Email và mật khẩu'
        })
        User.findOne({ email: req.body.email })
            .exec(async (error, user) => {
                if (error) return res.status(400).json({ error });
                if (user) {
                    const isMatKhau = await user.authenticate(req.body.matKhau);
                    if (isMatKhau && (user.vaiTro === 'super-admin' || user.vaiTro === 'admin')) {
                        const token = jwt.sign({ _id: user._id, vaiTro: user.vaiTro }, JWT_SECRET, { expiresIn: '10h' });
                        const { _id, tenNguoiDung, email, vaiTro } = user;
                        res.cookie('token', token, { expiresIn: '10h' });
                        res.status(200).json({
                            token,
                            user: { _id, tenNguoiDung, email, vaiTro }
                        });
                    } else {
                        return res.status(400).json({
                            error: 'email hoặc mật khẩu không đúng'
                        })
                    }
                } else {
                    return res.status(400).json({ error: "Sai email hoặc mật khẩu" });
                }
            });
    }

    //Require Signin
    // requireSignin(req,res,next){
    //     const token = req.headers.authorization.split(' ')[1];
    //     const user = jwt.verify(token, JWT_SECRET);
    //     req.user = user;
    //     next();
    // }

    //signout

    signout(req, res) {
        res.clearCookie('token');
        res.status(200).json({
            message: 'Đăng xuất thành công'
        })
    }
}

module.exports = new AuthController();
