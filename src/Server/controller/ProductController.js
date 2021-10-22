
const Product = require('../model/Sach');
const { mutipleMongoseToObject } = require('../util/mongoose');

class ProductController {
    // với re là reqiure và res là response
    //[GET] /product/show
    show(req, res, next) {
        Product.find({})
            .then(data =>              
                res.json(data)
            )
            .catch(next);
    }
    //[POST] /product/create
    create(req, res, next) {
        const formDta = req.body;
        console.log(req.body)
        const product = new Product(formDta);
        product.save()
            .then(() => res.json('Đã lưu'))
            .catch(next);
    }

}
module.exports = new ProductController;