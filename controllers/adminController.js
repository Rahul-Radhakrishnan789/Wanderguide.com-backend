const Coupon = require('../models/couponModel')






const addCouponDiscount = async (req,res) => {

    const {
        couponId,
        discount,
        maxLimit,
        minPurchase,
        expDate,
      } = req.body;

      if( Coupon.findOne({couponId:couponId})){
        return res.status(404).json({ error:'Coupon already Created' })
      }

      const coupon = new Coupon({
        couponId,
        discount,
        maxLimit,
        minPurchase,
        expDate,
      });

      await coupon.save();

      return res.json({ status:"success",
      message: 'Coupon added successfully',
      data: coupon });
}


const editCoupon = async (req,res) => {
    const  couponId  = req.params.couponId;

    // console.log("couponId",couponId)
    const {
      discount,
      maxLimit,
      minPurchase,
      expDate,
    } = req.body;

  
    const existingCoupon = await Coupon.findOne({ _id:couponId });

    // console.log("existing Coupon,",existingCoupon)

    if (!existingCoupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    if (discount !== undefined) {
      existingCoupon.discount = discount;
    }

    if (maxLimit !== undefined) {
      existingCoupon.maxLimit = maxLimit;
    }

    if (minPurchase !== undefined) {
      existingCoupon.minPurchase = minPurchase;
    }

    if (expDate !== undefined) {

     
      existingCoupon.expDate = expDate;
    }

    const updatedCoupon = await existingCoupon.save();

    res.json({
      status: 'success',
      message: 'Coupon updated successfully',
      data: updatedCoupon,
    });
}




module.exports = {
    addCouponDiscount,
    editCoupon,
}