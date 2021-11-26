const express = require('express');
const { requireSignin, superAdminMiddleware  } = require('../../common-middleware');
const { initialData } = require('../../controller/admin/initialData');
const router = express.Router();


router.get('/initialdata', requireSignin, superAdminMiddleware , initialData);


module.exports = router;