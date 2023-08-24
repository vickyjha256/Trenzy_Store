const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    contact: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },

});
const User = mongoose.model('user', UserSchema);
module.exports = User;