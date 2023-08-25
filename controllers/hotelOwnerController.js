const Hotel =  require('../models/hotelsModel')



//add new hotels

const addHotel = async (req,res) => {
    const { hotelName,location, price,amenities,availableRooms,propertyType,images } = req.body;

    console.log(req.file)
    // console.log(req.body)
    const hotel = new Hotel({
        hotelName,
        location,
        price,
        amenities,
        availableRooms,
        propertyType,
        images
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