const Project = require('../models/project.model');
const express = require('express');
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const checkValid = require("../middleware/checkValid");

// List Projects
router.get('/projects', isLoggedIn, async (req, res, next) => {
  try {
    const projects = await Project.find({_user: req.currentUser});
    res.status(200).json(projects);  
  } catch (err) {
    next(err);   
  }
});

// Show Project
router.get('/projects/:id', isLoggedIn, checkValid.requestParams, async (req, res, next) => {
  try {
    const project = await Project.find({id: req.params.id,_user: req.currentUser});
    res.status(200);  
  } catch (err) {
    next(err);   
  }
});

// Create Project
router.post('/projects', isLoggedIn, checkValid.requestBody, async (req, res) => {
  let newProject = req.body;
  newProject._user = req.currentUser;
  newProject.createdAt = new Date();
  
  try {
    const project = await Project.create(newProject)
    res.status(200).json(project);  
  } catch (err) {
    next(err);       
  }
});

// Update project
router.patch('/projects/:id', isLoggedIn, checkValid.requestBody, checkValid.requestParams, async (req, res, next) => {
  try {
    const project = await Project.findOneAndUpdate({_id: req.params.id}, req.body)
    res.status(200).json(project); 
  } catch (err) {
    next(err);   
  }
});

// Delete Project
router.delete('/projects/:id', isLoggedIn, checkValid.requestParams, async (req, res, next) => {
  try {
    const project = await Project.findOne({_id: req.params.id});
    if (project) {
      await project.remove();
      res.status(204).json({message: "ok"});
    } else {
      res.status(404).json({error: "Project not found"});
    }
  } catch (err) {
    next(err);   
  }
});

module.exports = router;
