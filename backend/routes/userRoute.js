const express = require('express');
const User = require('../models/User');
const bcrypt = require("bcrypt")

const router = express.Router();

router.post ('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
    

    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'name, email, and password are required' 
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: 'User with email already exists'
        });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    res.status(201).json({
        message: 'User created successfully',
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
    });

    } catch (error) {
        console.log("Signup error:", error);

        res.status(500).json({
            message: "Internal server error",
        });
    }

});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email and password'
            })    
        }

        // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Login successful
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;