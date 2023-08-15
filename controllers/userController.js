const User = require('../models/userModel')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

//user registration

const userRegister = async (req,res) => {

    const {userName,password,email,city,state,pinCode} = req.body;

    const hashedPassword = await bcrypt.hash(password,10)

    const user = new User({
        userName:userName,
        password:hashedPassword,
        email:email,
        city:city,
        state:state,
        pinCode:pinCode})

        await user.save()

        res.status(200).json({
            status:"success",
            message:"user account registered succesfully"})
}