const Category = require("../model/Category");
const Publisher = require("../model/Publisher");
class OtherController {


  getAllCategories(req, res) {
    Category.find({}).populate('danhMucCon')
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(err => res.status(500).json({ message: 'Hệ thống lỗi, vui lòng thử lại sau' })
      )
  };
  getAllPublisher(req, res) {
    Publisher.find({})
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(err => res.status(500).json({ message: 'Hệ thống lỗi, vui lòng thử lại sau' })
      )
  }

}
module.exports = new OtherController();