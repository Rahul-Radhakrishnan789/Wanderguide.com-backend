
const express = require("express")

 const upload  = require('../middlewares/multerMiddleware')

const router = express.Router();

const tryCatch = require('../middlewares/tryCatch')

const {addHotel,
displayHotels}  = require('../controllers/hotelOwnerController')

router.post('/api/hotelowner/addhotel',upload.array('images',5),tryCatch(addHotel))

router.get('/api/hotelowner/displayhotels',tryCatch(displayHotels))




module.exports = router