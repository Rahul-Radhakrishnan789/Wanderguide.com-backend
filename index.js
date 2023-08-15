const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config();


app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017")
    .then(() => console.log("mongodb atlas connected"))
    .catch((e) => console.log("error found", e))

app.listen(2000,() =>{
    console.log("server listening on port 2000")
})