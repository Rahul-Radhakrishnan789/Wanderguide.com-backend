const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        // required: true
    },
    location: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    },
    amenities: [String],

    availableRooms: {
        type: Number,
        // required: true
    },
    bookedRooms: {
        type: Number,
        // required: true
    },
    propertyType: {
        type: String,
        enum: ['Hotel', 'Resort', 'Motel', 'Guest House', 'Other'],
        // required: true
    },
    reviews: [
        {
            username: String,
            rating: Number,
            reviewText: String
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HotelOwner'
    }
});

const Hotels = mongoose.model('Hotels', hotelSchema);

module.exports = Hotels;
