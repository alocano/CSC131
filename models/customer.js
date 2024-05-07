const mongoose = require('mongoose');
const Joi = require('joi');


const newrecipeSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
     
    },
    ingredients: [{
        name: {
            type: String,

        },
        measures: {
                us: {
                    amount: {
                        type: String,
                    },
                    unitShort: {
                        type: String,
                    },
                },
            },
    }],

    analyzedInstructions: [{
        name:{
            type: String,
        },
        steps: [{
            number: {
                type: Number
            },
            step:{
                type: String,
            },
        }],
    }],
     
    imageUrl: {
     type: String,
     required: false,
    },
     
});

const userRecipeSchema = new mongoose.Schema({
    title:{
        type: String
    },
    ingredients: {
        type: [String],
    },
    instructions: {
        type: [String],
        required: true
    },

}) 

const userRecipe = mongoose.model('userRecipe', userRecipeSchema);
const newRecipe = mongoose.model('newRecipe', newrecipeSchema);
module.exports.newRecipe = newRecipe;
module.exports.userRecipe = userRecipe;

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



