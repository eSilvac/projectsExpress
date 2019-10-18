const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/project-app', {useNewUrlParser: true, useUnifiedTopology: true});

let projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  _user: { type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model("Project", projectSchema)
