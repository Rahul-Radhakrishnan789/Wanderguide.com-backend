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

//user login

const userLogin = async (req,res) => {
    const {userName,password} = req.body;

    const user = await User.findOne({userName:userName})

    if (!user ) {
        return res.status(401).json({ error: 'Invalid username ' });
      }
      if (!await bcrypt.compare(password, user.password)) {

        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({userName:user.userName},'rahul',)  //{expiresIn:500}//seconds

      res.json({ 
        status:"success",
        message: 'Login successful',
        data:token
      });
}



module.exports = {
    userRegister,
    userLogin,
}