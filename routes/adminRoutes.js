const express = require('express');

const router = express.Router();

const tryCatch = require('../middlewares/tryCatch')


const {
    addCouponDiscount,
    editCoupon,
    displayCoupons,
    fetchAllUsers,
    fetchHotelOwners,
    blockUser,
    unblockUser,
} = require('../controllers/adminController')

router.post('/api/admin/addcoupon',tryCatch(addCouponDiscount))

router.put('/api/admin/editcoupon/:couponId',tryCatch(editCoupon))

router.get('/api/admin/displaycoupons',tryCatch(displayCoupons))

router.get('/api/admin/fetchallusers',tryCatch(fetchAllUsers)) 

router.get('/api/admin/fetchhotelowners',tryCatch(fetchHotelOwners))

router.put('/api/admin/blockuser/:userId',tryCatch(blockUser))

router.put('/api/admin/unblockuser/:userId',tryCatch(unblockUser))

module.exports = router