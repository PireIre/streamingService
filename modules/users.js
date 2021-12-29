const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 2,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: true,
    },
    phone: {
        type: String,
        required: true,
        maxlength: 5,
        maxlength: 50
    },
})

const User = mongoose.model("User", userSchema);

validateUserSchema = (user) => {
    
    const schema = {
        name: Joi.string().required().min(2).max(50),
        phone: Joi.string().required().min(5).max(50),
        isGold: Joi.boolean()
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUserSchema;