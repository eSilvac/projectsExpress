const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/user.model');

const verySecret = "6926F2BF8BC542620DB47571A88C1DA761C976744CA554833C4BAA917ACD0E20";

router.get("/session/new", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/users", "login.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/views/users", "register.html"));
});

router.post('/users', async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing")
  }

  try {
    const user = await User.create(req.body)
    const token = jwt.sign({
      userId: user._id,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, verySecret);
    
    res.status(201).json({ token });
  } catch (err) {
    next(err); 
  }
});

router.post('/session', async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing")
  }

  try {
    const user = await User.findOne(req.body)
    
    if (user) {
      const token = jwt.sign({
        userId: user._id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      }, verySecret);
      
      res.status(201).json({ token });
    } else {
      res.status(404).json({ error: "User not found." });
    }
      
  } catch (err) {
    next(err);  
  }
});


module.exports = router;
