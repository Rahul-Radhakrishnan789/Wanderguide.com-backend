const express = require("express")



const router = express.Router();

const tryCatch = require('../middlewares/tryCatch')

const {addHotel}  = require('../controllers/hotelOwnerController')

router.post('/api/hotelowner/addhotel',tryCatch(addHotel))




module.exports = router