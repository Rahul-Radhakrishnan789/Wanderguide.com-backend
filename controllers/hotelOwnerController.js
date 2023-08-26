const Hotel =  require('../models/hotelsModel')
const upload = require('../middlewares/multerMiddleware')


//add new hotels

const addHotel = async (req,res) => {
    const { hotelName,location, price,amenities,availableRooms,propertyType } = req.body;

    console.log(req.files)
    // console.log(req.body)
    const hotel = new Hotel({
        hotelName,
        location,
        price,
        amenities,
        availableRooms,
        propertyType,
        
    })


      await hotel.save()

    res.status(200).json({
        status:"success",
        message:"Hotel created succesfully",
        data: hotel,
      })

}


module.exports = {
    addHotel,
}