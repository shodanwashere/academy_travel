const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const { User } = require('../model/user.model');
require('dotenv').config()


  // Login route
    exports.login = async (req, res) => {
    const username = req.headers["username"]
    const password = req.headers["password"]
    try{
    existingUser = await User.findOne({ username : username }).select('+password').exec();
    if (!existingUser) return res.status(401).json({ error: 'Invalid credentials:username' });
    
    const isValid = await bcrypt.compare(password, existingUser.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials:password' });

    return res.status(200).json({user: existingUser});
    }
      catch (error) {
      return res.status(500).json({ error: error });
    }
  };
  
  // Register route
    exports.register = async (req, res) => {
      const { username, name, password} = req.body;

      // Check if the username is already taken
      existingUser = await User.findOne({ username: username});
      if (existingUser != null) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    
      // Hash the password before saving
      hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
      // Create a new user with isAdmin set to false
      const newUser = new User({
        username : username,
        name : name,
        password: hashedPassword,
        isAdmin : false
      }
      );
    
      try {
        novoUser = await newUser.save();
        return res.status(200).json({ message: 'User registered successfully'});
      } catch (error) {
        return res.status(500).json({ error: error });
      }
    }
    ;
  
   
    


