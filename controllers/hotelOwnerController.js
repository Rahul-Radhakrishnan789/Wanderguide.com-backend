const Hotel =  require('../models/hotelsModel')
const upload = require('../middlewares/multerMiddleware')


//add new hotels

const addHotel = async (req,res) => {
    const { hotelName,location, price,amenities,availableRooms,propertyType,state} = req.body;

    console.log(req.files)
    const images = req.files.map(({ path, originalname }) => ({ path, originalname }));
     
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
        state,
        amenities,
        availableRooms,
        propertyType,
        images:images

    })



      await hotel.save()

    res.status(200).json({
        status:"success",
        message:"Hotel created succesfully",
        data: hotel,
      })

}

const displayHotels = async(req,res) => {

  const hotels = await Hotel.find();
 
  res.json({
    status:"success",
    data:hotels
  })


}


module.exports = {
    addHotel,
    displayHotels
}