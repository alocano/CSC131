const mongoose = require('mongoose');
const winston = require('winston');
require('dotenv').config(); // Add this to use environment variables

module.exports = function() {
    // Use environment variables for sensitive information
    const db = process.env.MONGODB_URI || 'mongodb+srv://default:123@csc131.vdtb9xd.mongodb.net/customerDatabase'; // Fallback is your default URI

    mongoose
        .connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => winston.info(`Connected to MongoDB at ${db}...`))
        .catch(err => {
            winston.error('Could not connect to MongoDB...', err);
            process.exit(1);
        });
};
