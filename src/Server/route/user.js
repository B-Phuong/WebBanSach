const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const userController = require('../controller/UserController');
const { validationOders, isRequestValidated, validationUser } = require('../validators/value');
const hoaDonController = require('../controller/HoaDonController');
const { requireSignin, userMiddleware } = require('../common-middleware');

router.put('/:id/editpassword', requireSignin, userMiddleware, userController.editPassword);
router.get('/purchase/:orderstatus', userController.getOrderByStatus);
router.get('/pay', requireSignin, userMiddleware, userController.getPaypal);
// router.post('/orders', validationOders, isRequestValidated, userController.orderBooks);
router.get('/:id', requireSignin, userMiddleware, userController.info);
router.put('/:id', requireSignin,validationUser, isRequestValidated, userController.edit);

// router.delete('/delete/:id', userController.delete); 
// router.get('/pay/success', (req, res) => {
//     const payerId = req.query.PayerID;
//     const paymentId = req.query.paymentId;

//     const execute_payment_json = {
//         "payer_id": payerId,
//         "transactions": [{
//             "amount": {
//                 "currency": "USD",
//                 "total": total.toString()
//             }
//         }]
//     };

//     paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//         if (error) {
//             // res.render('cancle');
//             res.status(404).json({ message: '' })
//         } else {
//             console.log(JSON.stringify(payment));
//             res.status(200).json({ message: '' })
//             //res.render('success');
//         }
//     });
// });



module.exports = router;