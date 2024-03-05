const express = require('express');
const cors = require('cors');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const config = require('./startup/config');
const winston = require('winston');
const err = require('./middleware/errors');
const customerRoutes = require('./routes/customer-routes');
const recipeRoutes = require('./routes/recipeRoutes');
const app = express();

require('./startup/db')();
require('./startup/logging')();
require('./startup/validations')();

app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/recipes', recipeRoutes); // Using recipe routes
app.use(customerRoutes.routes);
app.use(err);

const port = config.port || 8080; // Ensuring port is correctly set from config or default
app.listen(port, () => winston.info(`App is listening on url http://localhost:${port}`)); // Changed to template string for dynamic port
