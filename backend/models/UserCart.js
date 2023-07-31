const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserCartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    productID: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    size: {
        type: Number,
        required: true,
        // min: [5, "Size can't be less than 1."],
    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
        // min: [1, "Quantity can't be less than 1."],
    }
});

module.exports = mongoose.model('usercart', UserCartSchema);