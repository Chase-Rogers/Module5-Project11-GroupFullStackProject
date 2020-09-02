const mongoose = require('mongoose');
const Schema = mongoose.Schema

const drinkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    quantity: Number,
    required: false
})

module.exports = mongoose.model("Drink", drinkSchema)