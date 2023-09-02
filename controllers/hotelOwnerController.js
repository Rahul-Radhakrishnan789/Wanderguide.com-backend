const Hotel =  require('../models/hotelsModel')



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

//display all hotels

const displayHotels = async(req,res) => {

  const hotels = await Hotel.find();
 
  res.json({
    status:"success",
    data:hotels
  })


}


//delete a specific hotel

const deleteHotel = async (req,res) => {

  const hotelId = req.params.id;

  const deletehotel = await Hotel.findByIdAndDelete(hotelId);

  if(!deletehotel){
    return res.status(404).json({ error: 'Hotel not found' });
  }

  return res.json({
    status: "success",
    message:"Hotel deleted"
  })
}


//update a hotel

const hotelUpdate = async (req, res) => {
   
  const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!updatedHotel) {
    return res.status(404).json({ error: 'Hotel not found' });
  }

 return res.json({ status:"success",
             message: 'Hotel updated successfully',
             data:updatedHotel });

};



module.exports = {
    addHotel,
    displayHotels,
    deleteHotel,
    hotelUpdate
}