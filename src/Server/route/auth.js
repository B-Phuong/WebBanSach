const express = require('express');
const router = express.Router();
const { requireSignin } = require('../common-middleware');
const AuthController = require('../controller/AuthController');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');

router.post('/signup',validateSignupRequest, isRequestValidated, AuthController.signup);
router.post('/signin',validateSigninRequest, isRequestValidated, AuthController.signin);
router.post('/signout',requireSignin, AuthController.signout);
router.post('/profile', AuthController.requireSignin,(req,res)=>{
    res.status(200).json({user:'profile'})
});
module.exports=router;