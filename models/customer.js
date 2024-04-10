const mongoose = require('mongoose');
const Joi = require('joi');


const recipeSchema = new mongoose.Schema({
    recipeid: {
        type: Number,
        requried: true
    },
    recipeTitle: {
        type: String,
    }
});

const recipeUrl = mongoose.model('recipeUrl', recipeSchema);

module.exports.recipeUrl = recipeUrl;
