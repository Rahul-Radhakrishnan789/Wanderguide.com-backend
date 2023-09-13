const User = require('../models/userModel')

const Hotel = require('../models/hotelsModel')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')


//user registration

const userRegister = async (req,res) => {

    const {userName,password,email,city,state,pinCode} = req.body;

    const hashedPassword = await bcrypt.hash(password,10)

    const user = new User({
        userName:userName,
        password:hashedPassword,
        email:email,
        city:city,
        state:state,
        pinCode:pinCode})

        await user.save()

        res.status(200).json({
            status:"success",
            message:"user account registered succesfully"})
}

//user login

const userLogin = async (req,res) => {
    const {userName,password} = req.body;

    const user = await User.findOne({userName:userName})

    if (!user ) {
        return res.status(401).json({ error: 'Invalid username ' });
      }
      if (!await bcrypt.compare(password, user.password)) {

        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({userName:user.userName},'rahul',)  //{expiresIn:500}//seconds

      res.json({ 
        status:"success",
        message: 'Login successful',
        data:{
          token:token,
          userId:user._id
        }
      });
}

// search hotels

const searchHotels = async (req,res) => {


  const location = req.query.location;

  const regexState = new RegExp(location, 'i');

  const hotelsInState = await Hotel.find({ location: regexState });

  if (hotelsInState.length === 0) {
    return res.status(404).json({
      status: 'not found',
      message: 'No hotels found in the specified state',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Successfully fetched hotels',
    data: hotelsInState,
  });

}

//add to wishlist

const addToWishlist = async (req,res) => {
     

  const user = await User.findById(req.params.id);

  if(!user){
    return res.status(404).json({ error: 'User not found' });
  }

  const hotel = await Hotel.findById(req.body.hotelId)

  if(!hotel){
    return res.status(404).json({ error: 'Hotel not found' });
   }

   const isHotelInWishlist = user.wishlist.some((wishlistHotel) =>
   wishlistHotel.equals(hotel._id)
 );

 if (isHotelInWishlist) {
   return res.status(400).json({ error: 'Hotel is already in your wishlist' });
 }


   user.wishlist.push(hotel)
  await user.save()

  res.json({
            status:"success",
             message: 'hotel added to wishlist successfully',
             data: user 
            });
 }

 // delete from wishlist

   const removeFromWishlist = async (req,res) => {

    const {hotelid} = req.body;

    const user  = await User.findById(req.params.id)
    if(!user){
     return res.status(404).json({error:"user not found"})
    }
    const productIndex = user.wishlist.findIndex((hotelId) => hotelId.toString() === hotelid)

    if(productIndex === -1){
     return res.status(404).json({ error: 'Hotel not found in wishlist' });
    }

    user.wishlist.splice(productIndex,1)

    await user.save()

    res.status(200).json({
     status:"success",
     message:"Hotel Removed From Wishlist"
    })
   }

   //display wishlist

   const displayWishlist = async (req,res) => {

    const user = await User.findById(req.params.id).populate('wishlist')

    if(!user)
    {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
         
         status:"success",
         data:user.wishlist
        })
   }




module.exports = {
    userRegister,
    userLogin,
    searchHotels,
    addToWishlist,
    removeFromWishlist,
    displayWishlist,
}