const express = require('express');

const router = express.Router();

const tryCatch = require('../middlewares/tryCatch')

const userAuth = require('../middlewares/userAuth')

const {
    userRegister,
    userLogin
             } = require('../controllers/userController')

router.post('/api/users/register',tryCatch(userRegister))

router.post('/api/users/login',tryCatch(userLogin))









module.exports = router