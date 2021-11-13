const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const JWT_SECRET = 'aomalazadanobitadamvomomshizuka'
const {validationResult} = require('express-validator');
class AuthController {
    //signup
    async signup(req, res) {
        User.findOne({ email: req.body.email }).exec(async (error, user) => {
            if (user)
                return res.status(400).json({
                    error: "Tài khoản đã có người đăng ký",
                });

            const { tenNguoiDung, email, matKhau } = req.body;
            const hash_matKhau = await bcrypt.hash(matKhau, 10);
            const _user = new User({
                tenNguoiDung,
                email,
                hash_matKhau,
                tenTaiKhoan: shortid.generate(),
            });

            _user.save((error, user) => {
                if (error) {
                    return res.status(400).json({
                        message: "Có gì đó không ổn",
                    });
                }

                if (user) {
                    return res.status(201).json({
                        message: "Tài khoản tạo thành công"
                    });
                }
            });
        });
    }
    signin(req, res) {
        User.findOne({ email: req.body.email })
            .exec((error, user) => {
                if (error) return res.status(400).json({ error });
                if (user) {
                    if (user.authenticate(req.body.matKhau)) {
                        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1h' });
                        const { _id, tenNguoiDung, email, vaiTro } = user;
                        res.status(200).json({
                            token,
                            user: {
                                _id, tenNguoiDung, email, vaiTro
                            }
                        });
                    } else {
                        return res.status(400).json({
                            message: 'Tên tài khoản và mật khẩu không đúng'
                        })
                    }
                } else {
                    return res.status(400).json({ message: "Có gì đó hông ổn" })
                }
            });
    }

    //Require Signin
    requireSignin(req,res,next){
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    }
}

module.exports = new AuthController();
