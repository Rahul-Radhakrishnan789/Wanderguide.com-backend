const express = require('express');

const router = express.Router();

const tryCatch = require('../middlewares/tryCatch')


const {
    addCouponDiscount
} = require('../controllers/adminController')

router.post('/api/admin/coupon/:hotelId',tryCatch(addCouponDiscount))



module.exports = router