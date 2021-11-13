
const Book = require('../model/Book');
const KindOfBook = require('../model/Genres');

class BookController {
    // với re là reqiure và res là response
    //[GET] /book/show
    show(req, res) {
        Book.find({})
            // .populate('maNhaXuatBan')
            .then(data => {
                if (data === true)
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
    create(req, res) {  //CHƯA KIỂM TRA ĐƯỢC ĐIỀU KIỆN giaTien, tenSach, soLuongConLai   
        const book = new Book(req.body)
        const error = book.validateSync();
        book.save()
            .then(() => res.status(200).json({ message: 'Đã lưu' }))
            .catch(error => {  
                error.message=[]
                for(let err in error.errors){                 
                    error.message.push(error.errors[err].properties.message)
                    console.log(error.message)              
                }
                return res.status(400).json(error.message)            
               /// res.status(500).json({ message: err || 'Lỗi hệ thống' });
            })
    }
    //[PUT] /book/edit/:id   //CHƯA KIỂM ĐIỀU KIỆN SAU KHI CHỈNH
    edit(req, res) {
        Book.findOneAndUpdate({ "_id": req.params.id }, req.body)
            .then((data) => {                   
                //if (data)
                    res.status(200).json({ message: 'Đã cập nhật'});
                //else res.status(500).json({ message: 'Vui lòng thử lại' });
            }
            )
            .catch(error => {
                res.status(500).json({ message: "Không tìm thấy sách muốn sửa" || 'Lỗi hệ thống'});
            })
    }
    delete(req, res) {
        const id = req.params.id;
        Book.findByIdAndDelete(id)
            .then(data => {
               // if (data)
                res.status(200).json({ message:"Đã xóa sách có id " + id})
                //else res.status(500).json({ message:"Không thể xóa"});
            })
            .catch(err => {
                res.status(500).json({ message:'Không thể xóa' || 'Lỗi hệ thống'});
            })
    }
    //[GET] /filter/:id
    filter(req, res) {
        const id = req.params.id;
        // const theloai = req.params.theloai;
        // KindOfBook.find({tenTheLoai:theloai})
        // .then(data=>{
        //     if(data) { const id = data
        //     console.log(id)}
        //     else res.json('Không có sách nào')
        // })
        // .catch(err=> res.json('Lỗi hệ thống'))
        Book.find({ maTheLoai: id })
            .then(data => {
                if (data) res.status(200).json(data)
                else res.status(404).json({ message:err || 'Không tìm thấy sách thích hợp'})
            })
            .catch(err => {
                res.status(500).json({ message:err || 'Lỗi hệ thống'});
            })


    }

}
module.exports = new BookController;