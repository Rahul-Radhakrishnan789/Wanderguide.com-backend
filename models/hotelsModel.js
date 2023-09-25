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
    state: {
        type:String
         // required: true
    },
    price: {
        type: Number,
        // required: true
    },
    amenities: {
       type:Array
    },
 
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
        enum: ['Hotel', 'Resort', 'Motel', 'Guest House', 'Hostel','Entire apartment','Homestay','Tent','Farm stay','Entire bungalow','Bed and breakfast',],
        // required: true
    },
    reviews: [
        {
            userName: {
                type: String,
                // required: true,
              },
              review: {
                type: String,
                // required: true,
              },
              rating: {
                type: Number,
                // required: true,
              },
        }
    ],
    
    images:{
        type:Array
    },
   
    longitude:{
         type:String
    },
    latitude:{
         type:String
        
    },
    coupons:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Coupon'
    }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
