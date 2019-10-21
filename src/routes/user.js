const User = require('../models/user.model');

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const verySecret = "6926F2BF8BC542620DB47571A88C1DA761C976744CA554833C4BAA917ACD0E20";

router.post('/register', async (req, res, next) => {
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

router.post('/login', async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing")
  }

  try {
    const user = await User.findOne(req.body)
    

    const token = jwt.sign({
      userId: user._id,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, verySecret);
    
    res.status(201).json({ token });
      
  } catch (err) {
    next(err);  
  }
});

module.exports = router;
