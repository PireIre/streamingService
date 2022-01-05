const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { User, validate } = require("../modules/user")
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth")

router.get("/", async (req, res)=> {
  const users = await User.find();

  res.send(users);
})

router.get("/me", auth,  async (req, res)=> {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
})

router.post("/", async (req, res)=> {
  const { error } = validate(req.body);

  if (error) return res.status(404).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if(user) return res.status(400).send("User already exists in the database")

  user = new User (_.pick(req.body, ["name", "email", "password", "isAdmin"]))
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  await user.save(); 
  
  const token = user.generateAuthenticationToken();
  res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email", "isAdmin"]));
})

module.exports = router;