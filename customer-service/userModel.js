const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'A user must have a name'],
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: [true, 'Email must be unique'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    address : String,
    contact: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

const User = new mongoose.model('SS_UserInfo', userSchema);

module.exports = User;