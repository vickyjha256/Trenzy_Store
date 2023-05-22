const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
const mongoURI = "mongodb://127.0.0.1:27017/shoestore";
// const mongoURI = process.env.SHOE_STORE_DB; // This is using .env file but it's not working on localhost.
// console.log(mongoURI);

mongoose.set('strictQuery', true);
const mongoConnection = () => {
    mongoose.connect(mongoURI, () => {
        console.log("MongoDB connected successfully.");
    })
}

module.exports = mongoConnection;