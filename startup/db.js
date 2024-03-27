const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    mongoose.connect('mongodb+srv://default:123@csc131.vdtb9xd.mongodb.net/customerDatabase', {
    }).then(() => winston.info('MongoDb connected successfuly...'));
} 