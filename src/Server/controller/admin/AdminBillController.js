const { model } = require('mongoose')
const Bill = require('../../model/Bill')
class AdminBillController{
    updateBill(req, res){
        Bill.updateOne(
            { _id: req.body._id, "orderStatus.type": req.body.type },
            {
              $set: {
                "orderStatus.$": [
                  { type: req.body.type, date: new Date(), isCompleted: true },
                ],
              },
            }
          ).exec((error, bill) => {
            if (error) return res.status(400).json({ error });
            if (bill) {
              res.status(201).json({ bill });
            }
          });
        };

        async getCustomerOrders(req, res) {
            const orders = await Bill.find({})
              .populate("chiTietHoaDon.maSach", "tenSach")
              .exec();
            res.status(200).json({ orders });
    }
}
module.exports = new AdminBillController();