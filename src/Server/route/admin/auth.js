const express = require('express');
const AuthController = require('../../controller/admin/AuthController');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');
const router = express.Router();


router.post('/admin/signup',validateSignupRequest, isRequestValidated, AuthController.signup);
router.post('/admin/signin',validateSigninRequest, isRequestValidated, AuthController.signin);
router.post('/admin/profile', AuthController.requireSignin,(req,res)=>{
    res.status(200).json({user:'profile'})
});
module.exports=router;