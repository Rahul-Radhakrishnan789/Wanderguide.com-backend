const Coupon = require('../models/couponModel')

const Hotel  = require('../models/hotelsModel')

const moment = require("moment");


const addCouponDiscount = async (req,res) => {
    const {
        couponCodeName,
        discount,
        discountStatus,
        expirationTime,
    } = req.body;

    const hotelId = req.params.hotelId;

    const { price } = await Hotel.findOne({ _id: hotelId })
    .select("price")
    .exec();

    const totalPrice = originalPrice - discount;
    const endDate = new Date(expirationTime);
    let currentDate = new Date().getTime(); // new Date().getTime() returns value in number
    console.log(endDate, currentDate); // endDate number > currentDate number

    const originalPrice = price;

}



module.exports = {
    addCouponDiscount,
}