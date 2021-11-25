const Bill = require("../model/Bill");
const Book = require("../model/Book");
const { mutipleMongoseToObject } = require("../util/mongoose");

class BillController {

  async orderBooks(req, res, next) {
    //return res.send({ message :'vãi nồi'})
    //  HoaDon.updateMany({},{"$set":{"tongTien": this +  1}})
    //  .then(data=> {
    //    return res.send(data)
    //  })
    
  //  var listIdBooks2 = ["618147f089465f029c56eeed","617d4a1d3e93ec7255011e44"]
  //  Book.find({_id:listIdBooks2}).then(data=> {return res.status(200).json({data})})

    var IdUser = req.user._id
    const { listbooksOder , diaChiGiaoHang,phiGiaoHang} = req.body;
    if (!Array.isArray(listbooksOder)) {
      // nếu không phải là mảng danh sách book
      return res.status(400).json({
        message: "Lỗi, vui lòng kiểm tra listbooks",
      });
    }
    // sort lại vì khi kiểm tra sách nó trả về list theo thứ tự tăng dần
    var listOderSort = await listbooksOder.sort((a,b) => a.maSach > b.maSach ? 1 : -1) 
   
    //listbooksOder = listbooksOder.sort()
    // lấy ds Id để kiểm tra số lượng sách còn đủ không
    const listIdBooks = await listOderSort.map((book) => {
      return book.maSach;
    });
    
    let checkAvailableBooks = await Book.find({ _id: listIdBooks })
      .then((listBook) => {
        
        // kiểm tra số lượng oder >
        if(listOderSort.length != listBook.length)
        return res.status(400).json({message: `Kiểm tra lại mã sách, số lượng sách gửi yêu cầu: ${listOderSort.length}, số lượng sách tìm thấy ${listBook.length}`})
        let viTriKhongDuSoLuongSach = -1
        let checkAvailable = listBook.every((book, index) => {
          {
            viTriKhongDuSoLuongSach = index;
          return book.soLuongConLai >= listOderSort[index].soLuong; // số lượng còn lại phải lớn hơn hoặc bằng số lượng đặt
        }});
        console.log(viTriKhongDuSoLuongSach)
        if (!checkAvailable)
          res.status(404).json({ message: `sách có mã ${listOderSort[viTriKhongDuSoLuongSach].maSach} Không đủ số lượng để đặt`,
        soLuongConLai:  listBook[viTriKhongDuSoLuongSach].soLuongConLai});
        else {
          // tính tổng tiền
          var tongtien = 0;
          listBook.forEach(
            (book,index) =>
              (tongtien +=
                (book.giaTien - (book.giaTien * book.giamGia) / 100) *
                listOderSort[index].soLuong)
          );

          // tạo hóa đơn
          var hoadon = new Bill();
          hoadon.phiGiaoHang = phiGiaoHang;
          hoadon.tongTien = tongtien + phiGiaoHang;
          hoadon.maKhachHang = IdUser;
          //var giatiensaugiam = (  - (  * listBook[index].giamGia) / 100) *  listOderSort[index].soLuong)
          // thêm books vào chi tiết hóa đơn
          listOderSort.forEach((hd,index) => {
            
            var itemCanThanhToan = {
              maSach: hd.maSach,
              tenSach : listBook[index].tenSach,
              soLuong : listOderSort[index].soLuong,
              giamGia : listBook[index].giamGia,
              giaTien : listBook[index].giaTien,
              tongTienSauGiam :  (listBook[index].giaTien - ( listBook[index].giaTien * listBook[index].giamGia * 0.01)) * hd.soLuong
              
            }
            hoadon.chiTietHoaDon.push(itemCanThanhToan);
          });
          hoadon.diaChiGiaoHang = diaChiGiaoHang;
          hoadon.orderStatus = [
            {
              type: "ordered",
              date: new Date(),
              isCompleted: true,
            },
            {
              type: "packed",
              isCompleted: false,
            },
            {
              type: "shipped",
              isCompleted: false,
            },
            {
              type: "delivered",
              isCompleted: false,
            },
          ];
          let luuhoadon = new Promise( async (resolve, reject)=>{
           await hoadon
            .save()
            .then(data=> resolve(data))
            .catch(err=> reject(err))
          }) 
            
          let truSoluongSach = new Promise( async (resolve, reject) => {
            listBook.forEach( async (book, index) => {
              // nếu cột số lượng bán chưa có thì gán = số lượng vừa được đặt
              var soluongban = (!book.soLuongBan) ? listOderSort[index].soLuong : book.soLuongBan + listOderSort[index].soLuong // cập nhật số lượng bán
            await  Book.updateOne({_id:listBook[index]._id},{soLuongConLai: book.soLuongConLai - listOderSort[index].soLuong,soLuongBan:soluongban })
            })
            resolve("đã cập nhật số lượng sách còn lại")
          })
          let bookQuery = Book.find({})
          let billQuery = Bill.find({})
          Promise.all([truSoluongSach,luuhoadon])
            .then((data) => {
              res.status(200).json({
                    status: 200,
                    message: "Tạo hóa đơn thành công",
                    data: data[1],
              })
            }) // lỗi khi lưu hóa đơn hoặc trừ số lượng sách bị lỗi
            .catch((err) => { return res.status(400).json({ error : err })})
        }
      })
      .catch((err) => { // lỗi khi kiểm tra số lượng còn có đủ không
        res.status(400).json({ error: err });
      });
    //return await res.status(200).json("Lỗi rồi 3 ơi")
  }
  //[GET] /Bill/
  show(req, res, next) {
    Bill.find({})
      .then((data) => res.json(data))
      .catch(next);
  }
  
  duyetdon(req, res) {
    const Bill = Bill.findById(req.params.id)
      .then((data) => {
        if (data) {
          data.trangThai = "da duyet";
          data.save();
          res.json("Thành công");
        } else {
          res.status(404);
          throw new Error("Don khong ton tai");
        }
      })
      .catch((er) => res.json(err));
  }

  acceptCancel(req, res) {
    Bill.findOneAndUpdate({ _id: req.params.id }, { trangThai: "Đã hủy" })
      .then((data) => {
        if (data) {
          res.status(200).json("Đã chấp nhận hủy đơn " + req.params.id);
          // const {trangThai,...rest} = data
          // update={
          //     ...rest,
          //     trangThai:'Đã hủy'
          // }
        } else res.json(err || "Yêu cầu hủy chưa được chấp nhận");
      })
      .catch((err) => res.json(err));
  }
  

}
module.exports = new BillController();
