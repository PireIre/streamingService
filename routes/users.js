//Dependencies
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 2,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: true,
    },
    phone: {
        type: String,
        required: true,
        maxlength: 5,
        maxlength: 50
    },
})

const User = mongoose.model("User", userSchema);

validateUserSchema = (user) => {
    
    const schema = {
        name: Joi.string().required().min(2).max(50),
        phone: Joi.string().required().min(5).max(50),
        isGold: Joi.boolean()
    }

    return Joi.validate(user, schema);
}

router.get("/", async (req, res) => {
    const users = await User
        .find() 

    res.send(users)
});

router.get("/:id", async (req, res) => {
    const user = await User
        .findById(req.params.id)

    if (!user) return res.status(404).send("404 - User ID not found")
    res.send(user);
});


router.post("/", async(req, res) => {
    const { error } = validateUserSchema(req.body);

    if (error) return res.status(404).send(error.details[0].message);

    let user = new User(
        { name: req.body.name,
          isGold: req.body.isGold,
          phone: req.body.phone })

    user = await user.save();

    res.send(user);
});

router.put("/:id", async (req, res) => {
    const { error } = validateUserSchema(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const user = await User
        .findByIdAndUpdate(req.params.id, { 
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone },
         {new: true}) //new: true returns an updated instance

    if (!user) return res.status(404).send("404 - User ID not found")

    res.send(user);
});

router.delete("/:id", async(req, res) => {
    const user = await User
        .findByIdAndRemove(req.params.id);

    if (!user) return res.status(404).send("404 - User ID not found")

    res.send(user);
});

module.exports = router;