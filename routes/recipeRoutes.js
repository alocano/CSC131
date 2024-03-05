const express = require('express');
const router = express.Router();
const { listRecipes, showRecipeDetails, addRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController');

// List all recipes
router.get('/', listRecipes);

// Show form to add a new recipe
router.get('/add', (req, res) => {
    res.render('addRecipe');
});

// Post a new recipe
router.post('/add', addRecipe);

// Show recipe details
router.get('/:id', showRecipeDetails);

// Update recipe details
router.post('/update/:id', updateRecipe);

// Delete a recipe
router.get('/delete/:id', deleteRecipe);

module.exports = router;
