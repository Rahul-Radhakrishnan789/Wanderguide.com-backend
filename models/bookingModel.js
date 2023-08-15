// bookingModel.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
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
        type: String,
        // required: true
    },
    numberOfGuests: {
        type: Number,
        // required: true
    },
    specialRequests: {
        type: String
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
    }
 
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
