const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { User } = require("../modules/user")
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken")
const config = require("config")

router.get("/", async (req, res)=> {
  const users = await User.find();

  res.send(users);
})

router.get("/:id", async (req, res)=> {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("404 - User ID not found")

  res.send(user);
})

router.post("/", async (req, res)=> {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if(!user) return res.status(400).send("Invalid email or password")

  //return boolean
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send("Invalid email or password")

  const token = jwt.sign({ _id:user._id }, config.get("jwtPrivateKey"))
  res.send(token)
})

const validate = (req) => {
  const schema = {
    email: Joi.string().min(5).max(250).required().email(),
    password: Joi.string().min(5).max(250).required(),
  }

  return Joi.validate(req, schema)
}

module.exports = router;