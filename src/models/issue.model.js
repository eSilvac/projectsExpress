const mongoose = require('mongoose')
const Schema = mongoose.Schema

let issueSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdAt: Date,
  _user: { type: Schema.Types.ObjectId, ref: 'User'}
  _project: { type: Schema.Types.ObjectId, ref: 'Project'}
});

module.exports = mongoose.model("Issue", issueSchema)
