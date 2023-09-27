const Coupon = require('../models/couponModel')






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




module.exports = {
    addCouponDiscount,
    editCoupon,
    displayCoupons,
}