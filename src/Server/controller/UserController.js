
const User = require('../model/User');
const Book = require('../model/Book');

class UserController {
    // với re là reqiure và res là response
    //[GET] /user/info
    info(req, res) {
        User.find({ _id: req.params.id })
            .select('-vaiTro')
            .then(data => {
                if (data)
                    res.json(data)
                else res.json('Không tìm thấy thông tin người dùng')

            })
            .catch(err => res.json(err))
    }



}
module.exports = new UserController;