//Dependencies
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
    genre: {
        type: String,
        required: true,
        maxlength: 5,
        maxlength: 50
    }
})

const Genre = mongoose.model("Genre", genreSchema);

// validate genre request
validateGenreRequest = (genre) => {

    // Define schema/format for the genre
    // Genre field is required and needs to be a string
    const schema = {
        genre: Joi.string().required()
    }

    // returns boolean
    return Joi.validate(genre, schema);
}

//GET all genres
router.get("/", async (req, res) => {
    const genres = await Genre
        .find() //find action genre
        .sort({ genre: 1 }) //ascending order (-1 is descending)
        .select({ genre: 1 }) //ascending order (-1 is descending)
    //  .limit(10) // give me up to 10 results 

    res.send(genres)
});

//GET one genre
router.get("/:id", async (req, res) => {
    const genre = await Genre
        .findById(req.params.id)

    if (!genre) return res.status(404).send("404 - Genre ID not found")
    res.send(genre);
});

//POST one genre
router.post("/", async (req, res) => {
    const { error } = validateGenreRequest(req.body);

    if (error) return res.status(404).send(error.details[0].message);

    let genre = new Genre({ genre: req.body.genre })
    genre = await genre.save();

    res.send(genre);
});

//PUT one genre
router.put("/:id", async (req, res) => {
    //Validate if request Body is allowed
    const { error } = validateGenreRequest(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    // FindID & Update Genre
    const genre = await Genre
        .findByIdAndUpdate(req.params.id, { genre: req.body.genre }, {new: true}) //new: true returns an updated instance

    if (!genre) return res.status(404).send("404 - Genre ID not found")

    //Update genre
    res.send(genre);
});

//DELETE one genre
router.delete("/:id", async(req, res) => {
    // Validate if ID exists
    // Validate if ID exists && Update Genre
    const genre = await Genre
        .findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send("404 - Genre ID not found")

    res.send(genre);
});

module.exports = router;