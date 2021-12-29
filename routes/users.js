//Dependencies
const express = require("express");
const router = express.Router();
const { User, validate } = require("../modules/users")

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
    const { error } = validate(req.body);

    if (error) return res.status(404).send(error.details[0].message);

    let user = new User(
        { name: req.body.name,
          isGold: req.body.isGold,
          phone: req.body.phone })

    user = await user.save();

    res.send(user);
});

router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
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