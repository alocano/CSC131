const express = require('express')
const {getAllCustomers, getDeleteCustomerView, deleteCustomer, searchRecipe, getSearchView, viewRecipe, favoriteRecipe, getFavoriteView, addRecipe, getUserFavoriteView, getDeleteUserView, deleteUserFavorite, getUpdateUserView, updateUser, advancedSearch} = require('../controllers/customerController');


const router = express.Router();

router.get('/', getAllCustomers);
router.get('/deleteCustomer/:id', getDeleteCustomerView);
router.post('/deleteCustomer/:id', deleteCustomer);
router.get('/search',getSearchView)
router.post('/search/results', searchRecipe)
router.get('/search/results/:id', viewRecipe)
router.post('/search/results/:id', favoriteRecipe)
router.get('/favorites/:id', getFavoriteView)
router.post('/favorites/:id', getDeleteCustomerView)
router.get('/test', (req, res) => {
    res.render('test');
})
router.get('/addRecipe', (req, res) =>{
    res.render('addRecipe');
})
router.post('/addRecipe',addRecipe)
router.get('/userFavorites/:id',getUserFavoriteView)
router.get('/deleteUserCustomer/:id', getDeleteUserView)
router.post('/deleteUserCustomer/:id', deleteUserFavorite)
router.get('/updateUser/:id',getUpdateUserView)
router.post('/updateUser/:id',updateUser)
router.get('/search/cuisine/:id', advancedSearch )
module.exports = {
    routes: router
}


