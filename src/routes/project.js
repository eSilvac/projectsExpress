const Project = require('../models/project.model');
const express = require('express');
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn.js");

router.get('/projects', isLoggedIn, async (req, res, next) => {
  try {
    const projects = await Project.find({_user: req.currentUser});
    res.json(projects);  
  } catch (err) {
    next(err);   
  }
});

router.post('/project', isLoggedIn, async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing")
  }

  let newProject = req.body;
  newProject._user = req.currentUser;
  newProject.createdAt = new Date();
  
  try {
    const project = await Project.create(newProject)
    res.json(project);  
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(422).json({ errors: err.errors });    
    } else {
      next(err);       
    }   
  }
});

module.exports = router;
