
const Book = require('../model/Book');
const { mutipleMongoseToObject } = require('../util/mongoose');

class BookController {
    // với re là reqiure và res là response
    //[GET] /book/show
    show(req, res) {
        Book.find({})
            .then(data => {
                if (data)
                    res.json(data)
                else res.json('Hiện không có sách nào')
            }
            )
            .catch(err => res.json('Lỗi hệ thống'));
    }
    //[POST] /Book/create
    create(req, res) {
        const formDta = req.body;
        console.log(req.body)
        const Book = new Book(formDta);
        Book.save()
            .then(() => res.json('Đã lưu'))
            .catch(err => res.json('Lỗi hệ thống'));
    }
    //[PUT] /Book/edit/:bidanh
    edit(req, res) {
        const formDta = req.body;
        Book.findOneAndUpdate({ "biDanh": req.params.bidanh }, formDta)
            .then((data) => {
                if (data)
                    res.json('Đã cập nhật');
                else res.json('Vui lòng thử lại');
            }
            )

            .catch(err => res.json('Lỗi hệ thống'))
    }
    delete(req, res) {
        const id = req.params.id;
        Book.findByIdAndDelete(id)
            .then(data => {
                if (data)
                    res.json("Đã xóa sách có id " + id)
                else res.json("Không thể xóa");
            })
            .catch(err => res.json(err))
    }

}
module.exports = new BookController;