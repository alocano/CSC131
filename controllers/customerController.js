const {Customer, validate} = require('../models/customer')
const axios = require('axios')
const key_api = "36aa612cae804808ae3a93e625717e5c"

const getAllCustomers = async (req, res, next) => {
    const list = await Customer.find().exec();
    res.render('customerlist',{
        customers: list
    });
}

const getAddCustomerView = (req, res, next) => {
    res.render('addCustomer');
}

const addCustomer = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    const data = req.body;
    let customer = await new Customer({
        firstname: data.firstname,
        lastname: data.lastname,
        phonenumber: data.phonenumber,
        cnic: data.cnic,
        address: data.address
    });
    customer = await customer.save();
    res.redirect('/');


}

const getUpdateCustomerView = async (req, res, next) => {
    try{
        const id = req.params.id;
        const onecustomer = await Customer.findById(id).exec();
        res.render('updateCustomer', {
            customer: onecustomer
        });

    }catch(error){
        res.status(400).send(error.message);
    }
}

const updateCustomer = async(req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    const id = req.params.id;
    const data = req.body;
    let customer = await Customer.findByIdAndUpdate(id, {
        firstname: data.firstname, 
        lastname: data.lastname,
        phonenumber: data.phonenumber,
        cnic: data.cnic,
        address: data.address
    }, {new: true});
    if(!customer) return res.status(404).send('Customer with the given id not found');

    res.redirect('/');

}

const getDeleteCustomerView = async (req, res) => {
    try{
        const id = req.params.id;
        const onecustomer = await Customer.findById(id).exec();
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
        const customer = await Customer.findByIdAndDelete(id);
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



module.exports = {
    getAllCustomers,
    getAddCustomerView,
    addCustomer,
    getUpdateCustomerView,
    updateCustomer,
    getDeleteCustomerView,
    deleteCustomer,
    searchRecipe,
    getSearchView,
    viewRecipe
    
}