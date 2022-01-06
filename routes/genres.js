//Dependencies
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../modules/genre")


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
router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);

    if (error) return res.status(404).send(error.details[0].message);

    let genre = new Genre({ genre: req.body.genre })
    genre = await genre.save();

    res.send(genre);
});

//PUT one genre
router.put("/:id", auth, async (req, res) => {
    //Validate if request Body is allowed
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    // FindID & Update Genre
    const genre = await Genre
        .findByIdAndUpdate(req.params.id, { genre: req.body.genre }, {new: true}) //new: true returns an updated instance

    if (!genre) return res.status(404).send("404 - Genre ID not found")

    //Update genre
    res.send(genre);
});

//DELETE one genre
router.delete("/:id", [auth, admin], async(req, res) => {
    // Validate if ID exists
    // Validate if ID exists && Update Genre
    const genre = await Genre
        .findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send("404 - Genre ID not found")

    res.send(genre);
});

module.exports = router;