
const express = require("express")

 const upload  = require('../middlewares/multerMiddleware')

const router = express.Router();

const tryCatch = require('../middlewares/tryCatch')

const {addHotel,
       displayHotels,
       deleteHotel,
        hotelUpdate}  = require('../controllers/hotelOwnerController');


router.post('/api/hotelowner/addhotel',upload.array('images',5),tryCatch(addHotel))

router.delete('/api/hotelowner/deletehotel/:id',tryCatch(deleteHotel))

router.get('/api/hotelowner/displayhotels',tryCatch(displayHotels))

router.put('/api/hotelowner/updatehotel/:id',tryCatch(hotelUpdate))




module.exports = router