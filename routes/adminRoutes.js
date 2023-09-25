const express = require('express');

const router = express.Router();

const tryCatch = require('../middlewares/tryCatch')


const {
    addCouponDiscount,
    editCoupon
} = require('../controllers/adminController')

router.post('/api/admin/addcoupon',tryCatch(addCouponDiscount))

router.put('/api/admin/editcoupon/:couponId',tryCatch(editCoupon))



module.exports = router