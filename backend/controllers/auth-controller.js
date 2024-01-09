const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const jwt = require('jsonwebtoken');


const login =async (req, res, next)=> 
{
  try {
      const {email, password} = req.body;
      
      const user = await User.findOne({email: email});
     
      if(!user)
      {
        res.status(401).json({message: "User Does not Exists"});

      }else if(user)
      {
        const passwordMatch= await bcrypt.compare(password, user.password);
        if(!passwordMatch)
        {
          res.status(401).json({message:"Password is incorrect"});
        }
        
       
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
          expiresIn: '1h',
          });
        
        res.status(200).json({token, message:"User Authenticated"});
      }



  } catch (error) {
    res.status(500).json({error: 'Login failed'})
  }
}


const register = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(async (doc) => {
      if (doc) {
        return res.status(409).json({ message: "User already Exists" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          name: name,
          email: email,
          password: hashedPassword,
          registrationDate: req.body.registrationDate,
        });

        await newUser.save();
        return res.status(200).json({ message: "User Created" });
      }
    })
    .catch((err) => {
      throw err;
    });
};







module.exports = {
  register,
  login,
};