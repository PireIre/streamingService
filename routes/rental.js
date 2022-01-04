//Dependencies
const express = require("express");
const router = express.Router();
const { Rental, validate } = require("../modules/rental")
const { Movie } = require("../modules/movie")
const { User } = require("../modules/user")

router.get("/", async (req, res) => {
    const rentals = await Rental
        .find() 
        .sort("-dateOut") //sort by date out in descending order

    res.send(rentals)
});

//GET one rental
router.get("/:id", async (req, res) => {
    const rental = await Rental
        .findById(req.params.id)

    if (!rental) return res.status(404).send("404 - Rental ID not found")
    res.send(rental);
});

//POST one rental
router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await User.findById(req.body.customerId);
    if (!customer) return res.status(404).send("Customer Id does not exist")

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send("Movie Id does not exist")

    if(movie.numberInStock === 0) return res.status(400).send("Movie Not in Stock")

    let rental = new Rental({ 
        customer: {
            _id: customer.id, 
            name: customer.name,
            phone: customer.phone
        }, 
        movie: {
            _id: movie.id, 
            title: movie.title, 
            dailyRentalRate: movie.dailyRentalRate
        },
    })
    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);
});


module.exports = router;