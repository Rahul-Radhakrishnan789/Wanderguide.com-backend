const express = require('express');

const router = express.Router();

const tryCatch = require('../middlewares/tryCatch')

const userAuth = require('../middlewares/userAuth')

const {
    userRegister,
    userLogin,
    searchHotels,
    addToWishlist,
    removeFromWishlist,
    displayWishlist,
    viewProduct,
    bookHotel,
    addReview,
    displayBookingDetails,
    bookingFinalStage,
    verifyPayment,
    payment,
    displayOrders,
 
             } = require('../controllers/userController')

router.post('/api/users/register',tryCatch(userRegister))

router.post('/api/users/login',tryCatch(userLogin))

router.get('/api/users/searchhotels',tryCatch(searchHotels))

router.post('/api/users/addtowishlist/:id',tryCatch(addToWishlist))

router.delete('/api/users/removefromwishlist/:id',tryCatch(removeFromWishlist))

router.get('/api/users/displaywishlist/:id',tryCatch(displayWishlist))

router.get('/api/users/specifichotel/:id',tryCatch(viewProduct))

router.post('/api/users/hotelbooking/:userId/:hotelId',tryCatch(bookHotel))

router.post('/api/users/review/:userid/:hotelid',tryCatch(addReview))

router.get('/api/users/displayBookingDetails/:userId/:bookingId',tryCatch(displayBookingDetails))

router.post('/api/users/bookingfinal/:bookingId',tryCatch(bookingFinalStage))

router.post('/api/users/paymentstart',tryCatch(payment))

router.post('/api/users/paymentend/:bookingId',tryCatch(verifyPayment))

router.get('/api/users/displayOrders/:userId',tryCatch(displayOrders))











module.exports = router