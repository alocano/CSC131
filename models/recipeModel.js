const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    ingredients: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        amount: {
            type: String,
            required: true,
            trim: true
        }
    }],
    instructions: {
        type: [String],
        required: true
    },
    prepTime: {
        type: Number,
        required: false
    },
    cookTime: {
        type: Number,
        required: false
    },
    servings: {
        type: Number,
        required: false
    },
    categories: [{
        type: String,
        required: false
    }],
    imageUrl: {
        type: String,
        required: false
    },
    source: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
