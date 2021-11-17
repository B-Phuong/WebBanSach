
const Book = require('../model/Book');

const Genres = require('../model/Genres');
const Bill = require('../model/Bill');
const User = require('../model/User');


class BookController {
    // với re là reqiure và res là response
    //[GET] /book/show
    showAll(req, res) {
        Book.find({})
            // .populate('maNhaXuatBan')
            .then(data => {
                if (data.length != 0)
                    res.status(200).json(data)
                else {
                    res.status(200).json({ message: 'Hiện không có sách nào' })
                }//
            }
            )
            .catch(err => {
                res.status(500).json({ message: err || 'Lỗi hệ thống' });
            })
    }
    //[POST] /book/create
    create(req, res) {  //CHƯA KIỂM TRA ĐƯỢC ĐIỀU KIỆN TRÙNG GIÁ TRỊ
        const book = new Book(req.body)
        if (req.file) {
            book.hinhAnh = req.file.filename
        }
        else {

            res.status(500).json({ message: 'Bạn hãy chọn ảnh cho sách' });
        }
        book.ISBN = Math.floor(10000000 + Math.random() * 9000000);

        //const error = book.validateSync();
        book.save()
            .then(() => res.status(200).json({ message: 'Đã lưu' }))
            .catch(error => {
                return res.status(400).json({ message: 'Lưu thất bại' })
            })


    }
    //[PUT] /book/edit/:id   //CHƯA KIỂM ĐIỀU KIỆN TRÙNG GIÁ TRỊ THUỘC TÍNH
    edit(req, res) {
        const book = new Book(req.body)
        Book.find({ $or: [{ "tenSach": book.tenSach }] })
            .then((data) => {
                if (data.length > 0) res.status(400).json({ message: 'Trùng tên sách' })
                else {
                    // if(!book.tenSach || !book.giaTien !! !book.maNhaXuatBan || book.maDanh m)
                    Book.findByIdAndUpdate(req.params.id, book)
                        .then((data) => {
                            //if (data)
                            res.status(200).json({ message: 'Đã cập nhật' });
                            //else res.status(500).json({ message: 'Vui lòng thử lại' });
                        }
                        )
                        .catch(error => {
                            return res.status(400).json({ mesage: 'Vui lòng thử lại' })
                            // res.status(500).json({ message: "Không tìm thấy sách muốn sửa" || 'Lỗi hệ thống'});
                        })
                }
            })
        //const error = book.validateSync();

    }
    delete(req, res) {
        const id = req.params.id;
        User.find({ 'gioHang.maSach': id })
            .then((data) => {
                console.log((data))
                if (data.length > 0)
                    return res.status(200).json({ message: "Sách này đang trong giỏ hàng của khách hàng" })
                else {
                    Book.findByIdAndDelete(id)
                        .then((book) => {
                            // if (data)
                            res.status(200).json({ message: "Đã xóa sách  " + book.tenSach })
                            //else res.status(500).json({ message:"Không thể xóa"});
                        })
                        .catch(err => {
                            res.status(500).json({ message: 'Không thể xóa, kiểm tra lại id' });
                        })
                    // res.status(400).json({ message: "" })
                }
            })
            .catch(err => { res.status(500).json({ message: 'Kiểm tra lại id sách' }) })

    }
    //[GET] /search/:idTheLoai  //XEM SÁCH TƯƠNG ỨNG VỚI MỖI THỂ LOẠI
    filterKindOfBook(req, res) {
        const id = req.params.idTheLoai;
        // const theloai = req.params.theloai;
        // Genres.find({tenTheLoai:theloai})
        // .then(data=>{
        //     if(data) { const id = data
        //     console.log(id)}
        //     else res.json('Không có sách nào')
        // })
        // .catch(err=> res.json('Lỗi hệ thống'))
        Book.find({ maTheLoai: id })
            .then(data => {
                if (data) res.status(200).json(data)
                //else res.status(404).json({ message: err || 'Không tìm thấy sách thích hợp' })
            })
            .catch(err => {
                res.status(500).json({ message: 'Không tìm thấy sách thích hợp' });
            })
    }
    //[GET] /:id
    detail(req, res) {
        Book.find({ _id: req.params.id })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ message: 'Không tìm thấy thông tin sách' });
            })

    }


    //[GET] /top10 
    top10Books(req, res) {
        // Bill.find({})
        //     .then((bill) => Bills = bill)
        //     .catch(err => {
        //         res.status(500).json({ message: 'Sách hiện tại không tồn tại' })
        //     })

        // if (Bills) {
        //     Bills.map(item => {
        //         item.chiTietHoaDon.map(book => {
        //             Book.findByIdAndUpdate(book.maSach, { daBan: 0 })
        //             Book.findById(book.maSach)
        //                 .then((data) => {

        //                     data.daBan += book.soLuong
        //                     data.save()

        //                     return console.log(data)
        //                 })

        //             console.log(book)
        //         })
        //     })
        // } else {
        //     res.status(500).json()
        // }

        Book.find({ soLuongBan: { $gt: 0 } })
            .sort({ "soLuongBan": -1 })
            .limit(10)
            .then((data) => {
                if (data.length > 0)
                    res.status(200).json({ message: 'Top 10 sách bán chạy', top10: data })
                else res.status(200).json({ message: 'Top 10 sách bán chạy', top10: 'Chưa có sách nào được bán' })
            })
            .catch(err => {
                res.status(500).json({ message: err })
            })

    }


}
module.exports = new BookController;