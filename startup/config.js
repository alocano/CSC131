const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const PORT = process.env.PORT || '8080';
const HOST = process.env.HOST || 'localhost';
const HOST_URL = process.env.HOST_URL || `http://${HOST}:${PORT}`;
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

assert(SPOONACULAR_API_KEY, 'SPOONACULAR_API_KEY is required');
assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    spoonacularApiKey: SPOONACULAR_API_KEY
};
