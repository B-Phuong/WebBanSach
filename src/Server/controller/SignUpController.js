const Account = require('../model/Account');
const { mutipleMongoseToObject } = require('../util/mongoose');

class SignUpController{
    show(req, res, next) {
        Account.find({})
            .then(data =>              
                res.json(data)
            )
            .catch(next);
        }

create(req, res) {
    // kiểm tra validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    const account = new Account({        
        username:  req.body.username,
        password:  req.body.password,
    })

    // lưu vào database
    account
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
module.exports = new SignUpController();