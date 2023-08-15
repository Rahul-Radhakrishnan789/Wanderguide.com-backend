const express = require('express');

const router = express.Router;

const tryCatch = require('../middlewares/tryCatch')

const {userRegister}  = require('../controllers/userController')

router.post('/api/users/register',tryCatch(userRegister))