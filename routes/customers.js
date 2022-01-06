//Dependencies
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const { Customer, validate } = require("../modules/customer")

router.get("/", async (req, res) => {
    const customers = await Customer
        .find() 

    res.send(customers)
});

router.get("/:id", async (req, res) => {
    const customer = await Customer
        .findById(req.params.id)

    if (!customer) return res.status(404).send("404 - Customer ID not found")
    res.send(customer);
});


router.post("/", auth, async(req, res) => {
    const { error } = validate(req.body);

    if (error) return res.status(404).send(error.details[0].message);

    let customer = new Customer(
        { name: req.body.name,
          isGold: req.body.isGold,
          phone: req.body.phone })

    customer = await customer.save();

    res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const customer = await Customer
        .findByIdAndUpdate(req.params.id, { 
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone },
         {new: true}) //new: true returns an updated instance

    if (!customer) return res.status(404).send("404 - Customer ID not found")

    res.send(customer);
});

router.delete("/:id", auth, async(req, res) => {
    const customer = await Customer
        .findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send("404 - Customer ID not found")

    res.send(customer);
});

module.exports = router;