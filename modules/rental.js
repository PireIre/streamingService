const Joi = require("joi");
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: true,
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
        }),
        required: true,
    }, 
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 250
            },
            dailyRentalRate: {
                type: Number, 
                required: true,
                minlength: 0,
                maxlength: 250
            }
        }),
        required: true,
    },
    dateOut: {
        type: Date, 
        required: true, 
        default: Date.now
    },
    dateReturn: {
        type: Date,
    }, 
    rentalFee: {
        type: Number,
        min: 0, 
    }
})

const Rental = mongoose.model("Rental", rentalSchema);

validateRentalRequest = (rental) => {

    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    }

    // returns boolean
    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRentalRequest;
