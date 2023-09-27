const mongoose = require("mongoose");

const moment = require("moment");


const couponSchema = new mongoose.Schema({
    couponId:{
        type:String,
    },
    addDate:{
        type:String,
        default: moment().format("DD/MM/YYYY") + ";" + moment().format("hh:mm:ss"),
    },
    discount:{
        type:Number,

    },
    minPurchase:{
        type:Number,
    },
    expDate:{
        type:Date,
        // required:true,

    },
    status:{
        type:Boolean,
        default:true,
    },
 

});


const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;