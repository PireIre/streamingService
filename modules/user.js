const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength:5,
    maxlength: 50,
  },
  email: {
    type: String, 
    required: true,
    unique: true,
    minlength:5,
    maxlength: 250,
  },
  password: {
    type: String, 
    required: true,
    minlength:5,
    maxlength: 1024,
  }
})

userSchema.methods.generateAuthenticationToken = function() {
  return jwt.sign({ _id:this._id }, config.get("jwtPrivateKey"))
}

const User = mongoose.model("User", userSchema);

const validateUserRequest = (user) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(250).required().email(),
    password: Joi.string().min(5).max(250).required(),
  }

  return Joi.validate(user, schema)
}

exports.User = User;
exports.validate = validateUserRequest;