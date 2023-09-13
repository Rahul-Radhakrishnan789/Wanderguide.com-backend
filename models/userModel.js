const mongoose = require('mongoose')




const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        // required:true
        // unique: true
    },
    email:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        // required:true
    },
    gender:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    fullAddress:{
        type:String
    },
    mariatialStatus:{
        type:String
    },
    dateOfBirth:{
        type:Date
    },
    city:{
         type:String
    },
    pinCode:{
        type:Number
    },
    state:{
        type:String
    },
    wishlist:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotel",
    },
],
    bookings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Booking'
        }
    ]
})

const User = mongoose.model("User", userSchema)

module.exports = User;