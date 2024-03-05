const Recipe = require('../models/recipeModel');

const listRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.render('recipes', { recipes });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const showRecipeDetails = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        res.render('recipeDetails', { recipe });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addRecipe = async (req, res) => {
    // Construct new recipe from form data and save
    const { title, description, ingredients, instructions, prepTime, cookTime, servings, imageUrl, source } = req.body;
    const newRecipe = new Recipe({
        title,
        description,
        ingredients: ingredients.split(',').map(ingredient => ({ name: ingredient.split(':')[0].trim(), amount: ingredient.split(':')[1].trim() })),
        instructions: instructions.split('\n'),
        prepTime,
        cookTime,
        servings,
        imageUrl,
        source
    });

    try {
        await newRecipe.save();
        res.redirect('/recipes');
    } catch (error) {
        res.status(400).render('addRecipe', { errorMessage: "Error creating recipe", recipe: req.body });
    }
};

const updateRecipe = async (req, res) => {
    try {
        await Recipe.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/recipes/' + req.params.id);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteRecipe = async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.redirect('/recipes');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    listRecipes,
    showRecipeDetails,
    addRecipe,
    updateRecipe,
    deleteRecipe
};
