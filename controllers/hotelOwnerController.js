const Hotel =  require('../models/hotelsModel')

const cloudinary = require('../cloudinary/cloudinary')

const fs = require('fs')

const accountSid = process.env.TWILIO_ACCOUNT_SID 

const authToken = process.env.TWILIO_AUTH_TOKEN  

const client = require('twilio')(accountSid,authToken)






//hotel owner signup

const hotelOwnerSignUp = async (req,res) => {

  const { phoneNumber } = req.body;

  const generateOTP = () => {

    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const otp = generateOTP()

  client.messages
  .create({
    body: `Your OTP is ${otp}`,
    to: phoneNumber, 
    from: '+13392302900' ,
  })
  .then((message) => console.log(message));

  res.status(200).json({
    status:'success',
    message:'message sent successfully',
    data:otp,
  })

}

//add new hotels

const addHotel = async (req,res) => {

  let urls= []

        console.log(req.body)
    
      const { hotelName,location, price,amenities,availableRooms,propertyType,state,longitude,latitude} = req.body;

        const uploader = async ( path)=> await cloudinary.uploads(path,'images')
        if ( req.method == "POST"){

           
           const files = req.files 
           
           for ( const file of files ){
                
                const { path } = file
                
              const newPath = await uploader(path)
                
                urls.push(newPath)
                
                fs.unlinkSync(path)
           }


    const hotel = new Hotel({
      hotelName,
      location,
      price,
      state,
      amenities:amenities.split(','),
      availableRooms,
      propertyType,
      images:urls,
      longitude:longitude[0],
      latitude:latitude[0]

  })



    await hotel.save()

  res.status(200).json({
      status:"success",
      message:"Hotel created succesfully",
      data: hotel, 
    })

           }
      
           else{

               res.status(400).json({
                    err: " image not uploaded"
               })
           }          







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

const totalRevenueCreated = async(req,res) => {
  
}



module.exports = {
    addHotel,
    displayHotels,
    deleteHotel,
    hotelUpdate,
    hotelOwnerSignUp
}