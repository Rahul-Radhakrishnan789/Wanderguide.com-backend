const mongoose = require('mongoose');
const moment = require("moment");

const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        // required: true
    },
    phoneNumber:{
        type:Number,
        // required: true
    },
    checkInDate: {
        type: Date,
        // required: true
    },
    checkOutDate: {
        type: Date,
        // required: true
    },
    roomNumber: {
        type: Number,
        // required: true
    },
    numberOfGuests: {
        type: Number,
        // required: true
    },
    specialRequests: {
        type: String
    },
    addDate:{
        type:String,
        default: moment().format("DD/MM/YYYY") + ";" + moment().format("hh:mm:ss"),
    },
    totalPrice: {
        type: Number,
        default:0,
        // required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending'
    },
    numberOfDays:{
        type:Number,
        // required: true   
    },
    hotel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotel",
    },
    order_id:{
        type:String, 
    }
 
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
