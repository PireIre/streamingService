//Dependencies
const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json());

// PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

// Gennres array
// Will later get it from database
const genres = [
    {id: 1, genre: "Comedy"},
    {id: 2, genre: "Drama"},
    {id: 3, genre: "Romantic"},
]

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
app.get("/api/genres", (req, res) => {
    res.send(genres)
});

//GET one genre
app.get("/api/genres/:id", (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id))

    if(!genre) return res.status(404).send("404 - Genre ID not found")
    res.send(genre);
});

//POST one genre
app.post("/api/genres", (req, res) => {
    const { error } = validateGenreRequest(req.body);

    if(error) return res.status(404).send(error.details[0].message);

    const newGenre = {
        id: genres.length + 1,
        genre: req.body.genre
    }

    genres.push(newGenre);
    res.send(newGenre);
});

//PUT one genre
app.put("/api/genres/:id", (req, res) => {
    // Validate if ID exists
    const genre = genres.find(genre => genre.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("404 - Genre ID not found")

    //Validate if request Body is allowed
    const { error } = validateGenreRequest(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    //Update genre
    genre.genre = req.body.genre;
    res.send(genre);
});

//DELETE one genre
app.delete("/api/genres/:id", (req, res) => {
    // Validate if ID exists
    const genre = genres.find(genre => genre.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("404 - Genre ID not found")

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});