const userModel = require('../models/user.model');

const express = require('express');
const router = express.Router();

router.post('/register', async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing")
  }

  try {
    const user = await userModel.create(req.body)
    if (user) {
      req.session.user = user._id
      res.status(200).json(user);
    } else {
      return res.status(404).send("Something Happend!");
    }

  } catch (err) {
    next(err);  
  }
});

router.post('/login', async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing")
  }

  try {
    const user = await userModel.findOne(req.body)
    if (user) {
      req.session.user = user._id
      res.status(200).json(user);
    } else {
      return res.status(404).send("User not found");
    }
      
  } catch (err) {
    next(err);  
  }
});

module.exports = router;
