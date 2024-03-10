const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

require("dotenv").config();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) 
    return res.status(400).send('User already exists.');

    // Hash password
    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password, 10);
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"error in hashing password"
        });
    }

    // Create new user
        // user = new User({
        //   username,
        //   email,
        //   password: hashedPassword,
        // });

        // await user.save();

    const user = await User.create({
        username, email, password: hashedPassword
    });

      // // Generate JWT token
      // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // res.status(201).json({ token });
    return res.status(200).json({
      success:true,
      message:"User created Successfully",
    });
  } 
  catch (error) {
    console.log("error in creating user.");
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// ----------------------------------Login ----------------------------//

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        success:false,
        message:"user not registered, please signup",
      })
    }

    // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) 
      return res.status(401).send('Invalid password.');

      // Generate JWT token
     const payload = {
       email:user.email,
       id:user._id,
     }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'2h'});

      res.status(200).json({ token });

      // generate JWT, after passowrd matching
              // if(await bcrypt.compare(password, user.password)){
              //   const payload = {
              //     email:user.email,
              //     id:user._id,
              //   }
              //   jwt.sign(payload, process.env.JWT_SECRET, {
              //     expiresIn:'2h',
              //   }, (err, token)=>{
              //     res.json({token})
              //   });
              //   user.token = token;
              //   user.password = undefined;
              // }
              // res.status(200).json({
              //   success:true,
              //   message:"login Successfull",
              // })
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
