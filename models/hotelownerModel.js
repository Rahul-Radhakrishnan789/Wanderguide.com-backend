const mongoose = require('mongoose');

const hotelownerSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true
         // unique: true
    },
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    }
});

const HotelOwner = mongoose.model('HotelOwner', hotelownerSchema);

module.exports = HotelOwner;
