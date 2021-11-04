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
        daDuyet: req.body.daDuyet,
        daHuy: req.body.daHuy,
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
    duyetdon(req, res){
        const hoadon = HoaDon.findById(req.params.id)
            if (hoadon) {
                hoadon.daDuyet = true;
                const updatedOrder = hoadon.save()
                res.json(hoadon.save())
            } else {
                res.status(404)
                throw new Error('Don khong ton tai')
            }
    }
    huydon(req,res){
        const hoadon = HoaDon.findById(req.params.id)
            if (hoadon) {
                hoadon.daHuy = true
                const updatedOrder = hoadon.save()
                res.json(updatedOrder)
            } else {
                res.status(404)
                throw new Error('Don khong ton tai')
            }
    }
}
module.exports = new HoaDonController();
