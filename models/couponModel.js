const mongoose = require("mongoose");
const moment = require("moment");


const couponSchema = new mongoose.Schema({
    couponCodeName: {
        type: String,
        min: 5,
        max: 15,
        trim: true,
        uppercase:true,
        // required: true,
    },
    hoteltId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        // required: true,
    },
    discount: {
        type: String,
    },
    discountStatus: {
        type: Boolean,
        // required: true,
    },

    originalPrice: {
        type: Number,
    },
    finalPrice: {
        type: Number,
    },
    createdAt: {
        type: String,
        default: moment().format("DD/MM/YYYY") + ";" + moment().format("hh:mm:ss"),
    },
    updatedAt: {
        type: String,
        default: moment().format("DD/MM/YYYY") + ";" + moment().format("hh:mm:ss"),
    },
    expirationTime: {
        type: String,
        // required: true,
    },
});


const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;