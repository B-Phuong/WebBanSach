const express = require('express');
const { requireSignin, superAdminMiddleware  } = require('../../common-middleware');
const { initialData } = require('../../controller/admin/initialData');
const router = express.Router();


router.get('/initialdata', requireSignin, initialData);


module.exports = router;