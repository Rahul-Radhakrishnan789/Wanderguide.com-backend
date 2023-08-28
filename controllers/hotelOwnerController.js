const Hotel =  require('../models/hotelsModel')
const upload = require('../middlewares/multerMiddleware')


//add new hotels

const addHotel = async (req,res) => {
    const { hotelName,location, price,amenities,availableRooms,propertyType } = req.body;

    console.log(req.files)
    // console.log(req.body)

  //   if (!req.files) {
  //     return res.status(400).json({
  //         status: "error",
  //         message: "No images uploaded",
  //     });
  // } 

    const hotel = new Hotel({
        hotelName,
        location,
        price,
        amenities,
        availableRooms,
        propertyType,

    })

     hotel.images.push(req.files)


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