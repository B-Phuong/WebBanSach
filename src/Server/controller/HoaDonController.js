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
        if (!req.body) {
            res.status(400).send({ message: "Content can not be emtpy!" });
            return;
        }

        //  tạo mới hóa đơn
        const hoadon = new HoaDon({
            idUser: req.body.idUser,
            ngayDatHang: req.body.ngayDatHang,
            daDuyet: req.body.daDuyet,
            daHuy: req.body.daHuy,
            tongTien: req.body.tongTien,
            donViGiaoHang: req.body.donViGiaoHang,
            soLuong: req.body.soLuong
        })

        // lưu vào database
        hoadon
            .save()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a create operation"
                });
            });

    }
    duyetdon(req, res) {
        const hoadon = HoaDon.findById(req.params.id)
            .then(data => {
                if (data) {
                    data.trangThai = 'da duyet';
                    data.save()
                    res.json("Thành công")
                } else {
                    res.status(404)
                    throw new Error('Don khong ton tai')
                }
            
        })
        .catch(er=> res.json(err))
    }

    acceptCancel(req, res){
                HoaDon.findOneAndUpdate({ _id: req.params.id }, { trangThai: 'Đã hủy' })
                    .then(data => {
                        if (data) {
                            res.status(200).json('Đã chấp nhận hủy đơn ' + req.params.id)
                            // const {trangThai,...rest} = data
                            // update={
                            //     ...rest,
                            //     trangThai:'Đã hủy'
                            // }
                        }
                        else res.json(err || 'Yêu cầu hủy chưa được chấp nhận')
                    })
                    .catch(err => res.json(err))
            }

       
 
}
module.exports = new HoaDonController();
