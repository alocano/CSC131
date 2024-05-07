const {newRecipe,userRecipe,recipeUrl} = require('../models/customer')
const axios = require('axios')
const key_api = "0a20aa02ae154afbba9212b4b8b06a92"


const getAllCustomers = async (req, res, next) => {
    const list = await recipeUrl.find().exec();
    const userList = await userRecipe.find().exec();
    res.render('customerlist',{
        customers: list,
        users: userList
    });
}


const getDeleteCustomerView = async (req, res) => {
    try{
        const id = req.params.id;
        const onecustomer = await recipeUrl.findById(id).exec();
        res.render('deleteCustomer', {
            customer: onecustomer
        });

    }catch(error){
        res.status(400).send(error.message);
    }
}

const getDeleteUserView = async (req, res) => {
    try{
        const id = req.params.id;
        const onecustomer = await userRecipe.findById(id).exec();
        res.render('deleteUserCustomer', {
            customer: onecustomer
        });

    }catch(error){
        res.status(400).send(error.message);
    }
}


const deleteCustomer = async (req,res,next) => {
    try {
        const id = req.params.id;
        const customer = await recipeUrl.findByIdAndDelete(id);
        if(!customer) return res.status(404).send('Customer with the given id not found');
        res.redirect('/');
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const deleteUserFavorite = async (req,res,next) => {
    try {
        const id = req.params.id;
        const customer = await userRecipe.findByIdAndDelete(id);
        if(!customer) return res.status(404).send('Customer with the given id not found');
        res.redirect('/');
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const searchRecipe = async(req,res,next)=>{
  
   const query = req.body.query
   console.log(query)
   const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${key_api}`)
   console.log(response.data.totalResults)
   const recipies = response.data.results;
   res.render('results', {recipies})
}

const viewRecipe = async(req,res,next)=>{
    const {id} = req.params;
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${key_api}`)
    const recipe = response.data;
    res.render('recipe',{recipe})
}

const getSearchView = async(req,res,next)=>{
    res.render('search')
}


const favoriteRecipe = async(req,res,next)=>{
    const {id} = req.params
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${key_api}`)
    const recipe = response.data
    let recipeID = await new recipeUrl({
        recipeid: id,
        recipeTitle: recipe.title
    });
    recipeID = await recipeID.save();
    res.redirect('/');
}

const getFavoriteView = async(req,res,next)=>{
    const {id} = req.params;
    const mongoRecipe = await recipeUrl.findById(id).exec()
    const response = await axios.get(`https://api.spoonacular.com/recipes/${mongoRecipe.recipeid}/information?apiKey=${key_api}`)
    const recipe = response.data
    res.render('favorites',{mongoRecipe, recipe})
}

const getUserFavoriteView = async(req,res,next)=>{
    const {id} = req.params;
    const recipe = await userRecipe.findById(id).exec()
    res.render('userfavorites',{recipe})
}


const addRecipe = async(req,res,next)=>{
    const title = req.body.title;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    let recipe = await new userRecipe({
        title: title,
        ingredients: ingredients.split('\n'),
        instructions: instructions.split('\n'),
    });
        await recipe.save();
        res.redirect('/');
}

const getUpdateUserView = async(req,res,next)=>{
    const id = req.params.id;
    const recipe = await userRecipe.findById(id).exec();
    res.render('updateUserRecipe',{
        recipe: recipe
    });
}

const updateUser = async(req,res,next)=>{
    const id = req.params.id;
    const data = req.body;
    let recipe = await userRecipe.findByIdAndUpdate(id, {
        title: data.title,
        ingredients: data.ingredients.split('\n'),
        instructions: data.instructions.split('\n'),
    }, {new: true});
    recipe =await recipe.save(),
        res.redirect('/');
}

const advancedSearch = async(req,res,next)=>{
    const type = req.params.id;
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${type}&apiKey=${key_api}`)
    const recipies = response.data.results;
    res.render('results', {recipies})
}

module.exports = {
    getAllCustomers,
    getDeleteCustomerView,
    deleteCustomer,
    searchRecipe,
    getSearchView,
    viewRecipe,
    favoriteRecipe,
    getFavoriteView,
    addRecipe,
    getUserFavoriteView,
    deleteUserFavorite,
    getDeleteUserView,
    deleteUserFavorite,
    getUpdateUserView,
    advancedSearch,
    updateUser
    
}