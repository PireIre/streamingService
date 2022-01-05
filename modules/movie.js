const Joi = require("joi");
const number = require("joi/lib/types/number");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre")


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 250
    },
    genre: {
        type: genreSchema, 
        required: true
    },
    numberInStock: {
        type: Number, 
        required: true,
        minlength: 0,
        maxlength: 250
    },
    dailyRentalRate: {
        type: Number, 
        required: true,
        minlength: 0,
        maxlength: 250
    }
})

const Movie = mongoose.model("Movie", movieSchema);

// validate movie request
validateGenreRequest = (movie) => {

    // Define schema/format for the movie
    // Movie field is required and needs to be a string
    const schema = {
        title: Joi.string().required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().required().min(0).max(250),
        dailyRentalRate: Joi.number().required().min(0).max(250)
    }

    // returns boolean
    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateGenreRequest;