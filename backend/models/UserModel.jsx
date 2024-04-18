const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  Fname: {
    type: String,
    minLength: 3,
    maxLength: 15,
  },
  Lname: {
    type: String,
    minLength: 3,
    maxLength: 15,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
