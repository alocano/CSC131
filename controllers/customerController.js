const {recipeUrl, } = require('../models/customer')
const axios = require('axios')
const key_api = "1d68d72bbdce4a3cb35faa452ea79acf"


const getAllCustomers = async (req, res, next) => {
    const list = await recipeUrl.find().exec();
    res.render('customerlist',{
        customers: list
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


module.exports = {
    getAllCustomers,
    getDeleteCustomerView,
    deleteCustomer,
    searchRecipe,
    getSearchView,
    viewRecipe,
    favoriteRecipe,
    getFavoriteView
    
}