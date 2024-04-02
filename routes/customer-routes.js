const express = require('express')
const {getAllCustomers, getAddCustomerView, addCustomer, getUpdateCustomerView, updateCustomer, getDeleteCustomerView, deleteCustomer, searchRecipe, getSearchView, viewRecipe} = require('../controllers/customerController');


const router = express.Router();

router.get('/', getAllCustomers);
router.get('/addCustomer', getAddCustomerView);
router.post('/addCustomer', addCustomer);
router.get('/updateCustomer/:id', getUpdateCustomerView);
router.post('/updateCustomer/:id', updateCustomer);
router.get('/deleteCustomer/:id', getDeleteCustomerView);
router.post('/deleteCustomer/:id', deleteCustomer);
router.get('/search',getSearchView)
router.post('/search/results', searchRecipe)
router.get('/search/results/:id', viewRecipe)
router.get('/test', (req, res) => {
    res.render('test');
})
module.exports = {
    routes: router
}


