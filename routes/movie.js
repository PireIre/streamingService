//Dependencies
const express = require("express");
const router = express.Router();
const { Movie, validate } = require("../modules/movie");
const { Genre } = require("../modules/genre")



//GET all movies
router.get("/", async (req, res) => {
    const movies = await Movie
        .find() 

    res.send(movies)
});

//GET one movie
router.get("/:id", async (req, res) => {
    const movie = await Movie
        .findById(req.params.id)

    if (!movie) return res.status(404).send("404 - Movie ID not found")
    res.send(movie);
});

//POST one movie
router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre")

    let movie = new Movie({ 
        title: req.body.title,
        genre: {
            _id: genre._id,
            genre: genre.genre,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    })

    movie = await movie.save();

    res.send(movie);
});

//PUT one movie
router.put("/:id", async (req, res) => {
    //Validate if request Body is allowed
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    // FindID & Update Movie
    const movie = await Movie
        .findByIdAndUpdate(req.params.id, { 
            title: req.body.title,
            genre: req.body.genre,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
        },
         {new: true}) //new: true returns an updated instance

    if (!movie) return res.status(404).send("404 - Movie ID not found")

    //Update movie
    res.send(movie);
});

//DELETE one movie
router.delete("/:id", async(req, res) => {
    // Validate if ID exists
    // Validate if ID exists && Update Movie
    const movie = await Movie
        .findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send("404 - Movie ID not found")

    res.send(movie);
});

module.exports = router;