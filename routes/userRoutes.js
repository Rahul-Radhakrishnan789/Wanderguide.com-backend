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
    displayBookingDetails
 
             } = require('../controllers/userController')

router.post('/api/users/register',tryCatch(userRegister))

router.post('/api/users/login',tryCatch(userLogin))

router.get('/api/users/searchhotels',tryCatch(searchHotels))

router.post('/api/users/addtowishlist/:id',tryCatch(addToWishlist))

router.delete('/api/users/removefromwishlist/:id',tryCatch(removeFromWishlist))

router.get('/api/users/displaywishlist/:id',tryCatch(displayWishlist))

router.get('/api/users/specifichotel/:id',tryCatch(viewProduct))

router.post('/api/users/hotelbooking/:id',tryCatch(bookHotel))

router.post('/api/users/review/:userid/:hotelid',tryCatch(addReview))

router.get('/api/users/displayBookingDetails/:userId/:bookingId',tryCatch(displayBookingDetails))











module.exports = router