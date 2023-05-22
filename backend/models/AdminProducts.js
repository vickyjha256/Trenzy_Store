const mongoose = require('mongoose');

const { Schema } = mongoose;
const AdminProductsSchema = new Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: String,
        possibleValues: ['in', 'out'],
        required: true
    }
});

module.exports = mongoose.model('adminproducts', AdminProductsSchema);