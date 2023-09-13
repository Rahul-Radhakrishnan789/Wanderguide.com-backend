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
             } = require('../controllers/userController')

router.post('/api/users/register',tryCatch(userRegister))

router.post('/api/users/login',tryCatch(userLogin))

router.get('/api/users/searchhotels',tryCatch(searchHotels))

router.post('/api/users/addtowishlist/:id',tryCatch(addToWishlist))

router.delete('/api/users/removefromwishlist/:id',tryCatch(removeFromWishlist))

router.get('/api/users/displaywishlist/:id',tryCatch(displayWishlist))









module.exports = router