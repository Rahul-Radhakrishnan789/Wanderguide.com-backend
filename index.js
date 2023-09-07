const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config();


app.use(cors())
app.use(express.json())
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


mongoose.connect("mongodb://127.0.0.1:27017")
    .then(() => console.log("mongodb connected"))
    .catch((e) => console.log("error found", e))

    const userRoutes = require('./routes/userRoutes')
    app.use(userRoutes)

    //   const adminRouter = require("./routes/adminRoutes")
    //   app.use(adminRouter)

    const hotelOwnerRoutes = require("./routes/hotelOwnerRoutes")
    app.use(hotelOwnerRoutes)

app.listen(2000,() =>{
    console.log("server listening on port 2000")
})