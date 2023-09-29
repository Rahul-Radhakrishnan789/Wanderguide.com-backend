const mongoose = require('mongoose');

const hotelownerSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true
         // unique: true
    },
    phoneNumber: {
        type: Number,
        // required: true
    }
});

const HotelOwner = mongoose.model('HotelOwner', hotelownerSchema);

module.exports = HotelOwner;
