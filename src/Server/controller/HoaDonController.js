const HoaDon = require("../model/HoaDon");
const { mutipleMongoseToObject } = require("../util/mongoose");

class HoaDonController {
 
  //[GET] /HoaDon/
  show(req, res, next) {
    HoaDon.find({})
        .then(data =>              
            res.json(data)
        )
        .catch(next);
}
   // tạo hóa đơn
  create(req, res) {
    // kiểm tra validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    //  tạo mới hóa đơn
    const hoadon = new HoaDon({        
        idUser:  req.body.idUser,
        ngayDatHang:  req.body.ngayDatHang,
        trangThai: req.body.trangThai,
        tongTien:  req.body.tongTien,
        donViGiaoHang:  req.body.donViGiaoHang,
        soLuong:  req.body.soLuong
    })

    // lưu vào database
    hoadon
        .save()
        .then(data => {
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

  
}
module.exports = new HoaDonController();
