const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
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
})

const Customer = mongoose.model("Customer", customerSchema);

validateCustomerSchema = (customer) => {
    
    const schema = {
        name: Joi.string().required().min(2).max(50),
        phone: Joi.string().required().min(5).max(50),
        isGold: Joi.boolean()
    }

    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomerSchema;