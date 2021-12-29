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

exports.Genre = Genre;
exports.validate = validateGenreRequest;