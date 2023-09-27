const User = require('../models/userModel')

const Hotel = require('../models/hotelsModel')

const Booking = require('../models/bookingModel')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const Razorpay = require('razorpay')

const crypto = require('crypto')

const mongoose = require('mongoose');


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


   // display a specific hotel

   const viewProduct = async (req,res) => {
       
    const specificHotel = await Hotel.findById(req.params.id)
    if(!specificHotel){
        return res.status(404).json({ error: 'Hotel not found' });
      }

      res.json({
        status:"success",
        data:specificHotel
      })

}

// start first stage of booking

const bookHotel = async(req,res) => {

  const {checkInDate,checkOutDate,roomNumber,numberOfGuests} = req.body;

  const hotelId = req.params.hotelId;

  console.log(req.body)

  const user = await User.findById(req.params.userId);

  if(!user){
    return res.status(404).json({ error: 'User not found' });
  }


  const timeDifference = new Date(checkOutDate) - new Date(checkInDate); 

  const numberOfDays = Math.ceil(timeDifference/(1000 * 60 * 60 * 24));
  
 console.log(numberOfDays)



  const booking = new Booking({
    checkInDate:checkInDate,
    checkOutDate:checkOutDate,
    roomNumber:roomNumber,
    numberOfGuests:numberOfGuests,
    hotel:hotelId,
    numberOfDays:numberOfDays,
  });

    user.booking.push(booking);
    console.log(booking)

    await booking.save()
    await user.save()

    res.json({
      status:"success",
       message: 'booking stages started successfully',
       data: user.booking.pop()
      });
  
}

// add review

const addReview = async(req,res) => {

  const {review,rating} = req.body;

  console.log(review,rating)

  const user = await User.findById(req.params.userid);

  const hotel = await Hotel.findOne({_id:req.params.hotelid});

  if(!user){
    return res.status(404).json({ error: 'User not found' });
  }

  if(!hotel){
    return res.status(404).json({ error: 'hotel not found' });
  }

  const userName = user.userName;
  console.log(userName)
  
  hotel.reviews.push({
    userName:userName,
    rating:rating,
    review:review,
  })


  await hotel.save()

 return res.json({
      status:"success",
       message: 'review added successfully',
       data: hotel.reviews
      });

}

//display booking details

const displayBookingDetails = async (req,res) => {

  const bookingId = req.params.bookingId;

  const userId = req.params.userId;

  const user = await User.findById(userId).populate({
    path: 'booking',
    populate: { path: 'hotel' },
  })

  if(!user){
    return res.status(404).json({ error: 'User not found' });
  }

   const bookingDetails = user.booking.find((booking) => booking._id.toString() === bookingId)

   if(!bookingDetails){
    return res.status(404).json({error: 'booking not found'})
   }


   return res.json({
    status:"success",
     message: 'fetching successful',
     data: bookingDetails,
    });

}

//final stage of booking


const bookingFinalStage = async (req,res) => {

  const { fullName,phoneNumber,specialRequest,totalPrice }  = req.body;

  const bookingId = req.params.bookingId;

  const booking = await Booking.findById(bookingId);

  if(!booking){
    return res.status(404).json({ error: 'booking not found' });
  }

  booking.customerName = fullName;
  booking.phoneNumber = phoneNumber;
  booking.specialRequests = specialRequest;
  booking.totalPrice = totalPrice,


  await booking.save();

  
 return res.json({
  status:"success",
   message: 'booking datas added successfully',
   data:booking
  });

}

// payment section 

const payment = async (req,res) => {

  const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };  

  instance.orders.create(options, (error, order) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Something Went Wrong!" });
    }
    res.status(200).json({ data: order });
	});
}

const verifyPayment = async (req,res) => {

  const bookingId = req.params.bookingId;

  const booking = await Booking.findById(bookingId);

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			
      booking.order_id=  razorpay_order_id;
      booking.paymentStatus = "Paid";

      await booking.save();


      res.status(200).json({
      status:"success",
      message: "Payment verified successfully",
      data:razorpay_order_id,
      });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
}

// display orders 

const displayOrders = async (req,res) => {

  const userId = req.params.userId;

  const user = await User.findById(userId).populate({
    path: 'booking',
    populate: { path: 'hotel' },
  }); 

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const paidBookings = user.booking.filter((booking) => booking.paymentStatus === 'Paid');

  if (paidBookings.length > 0) {
    res.status(200).json({
      status:"success",
      message:"fetched all paid bookings",
      data:paidBookings,
    }); 
  } else {
    console.log('User has no paid bookings.');
    res.status(404).json({ message: 'User has no paid bookings.' });
  }

}


module.exports = {
    userRegister,
    userLogin,
    searchHotels,
    addToWishlist,
    removeFromWishlist,
    displayWishlist,
    viewProduct,
    bookHotel,
    addReview,
    displayBookingDetails,
    bookingFinalStage,
    payment,
    verifyPayment,
    displayOrders,
}