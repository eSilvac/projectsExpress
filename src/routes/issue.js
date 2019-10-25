const Project = require('../models/project.model');
const Issue = require('../models/issue.model');
const express = require('express');
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const checkValid = require("../middleware/checkValid");

// List Issues
router.get('/project/:id/issues', isLoggedIn, async (req, res, next) => {
  try {
    const projects = await Project.find({_user: req.currentUser});
    res.status(200).json(projects);  
  } catch (err) {
    next(err);   
  }
});

// Create Issue
router.post('/projects/:id/issues', isLoggedIn, checkValid.requestBody, async (req, res) => {
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


// Delete Issue
router.delete('/projects/:id/issues/:id', isLoggedIn, checkValid.requestParams, async (req, res, next) => {
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
