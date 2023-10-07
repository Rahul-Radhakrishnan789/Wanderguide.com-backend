const Coupon = require('../models/couponModel')

const User = require('../models/userModel')

const HotelOwner = require('../models/hotelownerModel')

// create coupon
const addCouponDiscount = async (req,res) => {

    const {
        couponName,
        discount,
        minPurchase,
        expDate,
      } = req.body;

      if(await Coupon.findOne({couponName})){
        return res.status(404).json({ error:'Coupon already Created' })
      }

  

      const coupon = new Coupon({
        couponId:couponName,
        discount,
        minPurchase,
        expDate,
      });

      await coupon.save();

      return res.json({ status:"success",
      message: 'Coupon added successfully',
      data: coupon });
}

// edit coupon
    
const editCoupon = async (req,res) => {

  const updatedHotel = await Coupon.findByIdAndUpdate(req.params.couponId, req.body, { new: true });

  if (!updatedHotel) {
    return res.status(404).json({ error: 'Hotel not found' });
  }

 return res.json({ status:"success",
             message: 'Hotel updated successfully',
             data:updatedHotel });

}

// display all coupons

const displayCoupons = async(req,res) => {

  const coupons = await Coupon.find();

  if(coupons.length < 1){
    return res.status(404).json({ error:'No coupons found' })
  }

  res.json({
    status: 'success',
    message: ' all Coupons fetched successfully',
    data: coupons,
  });

}

// fetch all users

const fetchAllUsers = async(req,res) => {

const users = await User.find();

res.status(200).json({
  status:'success',
  message:'fetched all users',
  data:users,
})

}

//frtch all hotelowners

const fetchHotelOwners = async(req,res) => {

  const hotelOwners = await HotelOwner.find();

  res.status(200).json({
    status:'success',
    message:'fetched all hotel owners',
    data:hotelOwners,
  })
}

// block user

const blockUser = async (req,res) => {
  
  const userId = req.params.userId;

  const user = await User.findByIdAndUpdate(userId,{blocked:true},{new:true})

  if (!user) {
    return "User not found";
  }

  res.json({
    status:'success',
    message:'user blocked succesfully',
    data:user,
  })
}

//unblock user

const unblockUser = async (req,res) => {
  
  const userId = req.params.userId;

  const user = await User.findByIdAndUpdate(userId,{blocked:false},{new:true})

  if (!user) {
    return "User not found";
  }

  res.json({
    status:'success',
    message:'user unblocked succesfully',
    data:user,
  })
}


module.exports = {
    addCouponDiscount,
    editCoupon,
    displayCoupons,
    fetchAllUsers,
    fetchHotelOwners,
    blockUser,
    unblockUser,
}