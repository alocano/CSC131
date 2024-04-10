const express = require('express')
const {getAllCustomers, getDeleteCustomerView, deleteCustomer, searchRecipe, getSearchView, viewRecipe, favoriteRecipe, getFavoriteView} = require('../controllers/customerController');


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
module.exports = {
    routes: router
}


