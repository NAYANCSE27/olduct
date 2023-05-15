const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url)

const connection = mongoose.connection;

connection.once('connected', () => {
    console.log('MongoDB connection successfull!');
})

connection.on('error', (err) => {
    console.log('MongoDB connection error.');
})

module.exports = connection;