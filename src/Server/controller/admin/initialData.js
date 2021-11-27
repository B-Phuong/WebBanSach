const Bill = require("../../model/Bill");

exports.initialData = async (req, res) => {
  const bills = await Bill.find({})
    .populate("chiTietHoaDon.maSach", "tenSach")
    .exec();
  res.status(200).json({
    bills,
  });
};
