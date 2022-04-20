const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A book must have a name'],
        trim: true,
    },
    price: {
        type: String,
        required: [true, 'A book must have a price']
    },
    author: {
        type: String,
        required: [true, 'A book must have an author']
    },
    description: {
        type: String,
        trim: true
    },
    isbn_no: {
        type: String
    },
    availability: {
        type: Boolean
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

const Inventory = new mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;