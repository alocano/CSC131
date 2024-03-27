const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minlength: 0,
        maxlength: 50,
        required: true
    },

    phonenumber: {
        type: String,
        minlength: 0,
        required: true
    },
    cnic: {
        type: String,
        required: true
    }, 
 
});

const Customer = mongoose.model('Customer', customerSchema);

const validateCustomer = (customer) => {
    const schema = Joi.object({
        firstname: Joi.string().required(),
  
        phonenumber: Joi.required(),
        cnic: Joi.string().required(),

    })

    return schema.validate(customer)
}


module.exports.Customer = Customer;
module.exports.validate = validateCustomer;