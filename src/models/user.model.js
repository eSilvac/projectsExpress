const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "is required"],
    unique: true
  },

  password: {
    type: String,
    required: [true, "is required"]
  },
  projects: [{ type: Schema.ObjectId, ref: 'Project'}]
});

module.exports = mongoose.model("User", userSchema)
