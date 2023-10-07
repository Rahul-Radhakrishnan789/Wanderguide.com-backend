const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const Coupon = require('./models/couponModel')
const moment = require('moment');
const Booking = require('./models/bookingModel')
const path = require('path')
require('dotenv').config();


app.use(cors())
app.use(express.json())
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


mongoose.connect(`mongodb+srv://razzrahul789:8UzBjdlfUqT1QaqO@cluster0.dqi7q6y.mongodb.net/`)
    .then(() => console.log("mongodb connected"))
    .catch((e) => console.log("error found", e))

    const userRoutes = require('./routes/userRoutes')
    app.use(userRoutes)

      const adminRouter = require("./routes/adminRoutes");
      app.use(adminRouter)

    const hotelOwnerRoutes = require("./routes/hotelOwnerRoutes")
    app.use(hotelOwnerRoutes)



const checkExpirationTime = () => {
    Coupon.find({})
        .exec()
        .then((Coupons) => {
            if (Coupons) {
                Coupons.map((getCoupon) => {
                    console.log(getCoupon.expDate)
                    if (
                        new Date().getTime() >= new Date(getCoupon. expDate).getTime() 
                    ) {
                    
                        Coupon.deleteMany({
                                _id: getCoupon._id,
                            })
                            .exec()
                            .then((deleteCoupon) => {
                                console.log(`Coupon doesnt exists or expired`);

                            })
                            .catch((error) => {
                                console.log(error, "Error occured on coupon section");
                            });
                    }
                });
            }
            if (!Coupon) {
                console.log("No Coupon found...");
            }
        });
};

const deletePendingBookings = async() => {
    try {
  
      const tenMinutesAgo = moment().subtract(10, 'minutes').toDate();
  
    
      const result = await Booking.deleteMany({
        paymentStatus: 'Pending',
        addDate: { $lt: tenMinutesAgo },
      });
  
      console.log(`Deleted ${result.deletedCount} pending bookings.`);
    } catch (error) {
      console.error('Error deleting pending bookings:', error);
    }
  }
  


setInterval(() => {
    checkExpirationTime()
    deletePendingBookings()
    console.log('hi')
  }, 10000000);


  

  app.listen(2000,() =>{
    console.log("server listening on port 2000")
})