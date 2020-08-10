const mongoose = require('mongoose');
const Schema = mongoose.Schema

const sideSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    condiments: {
        type: Array,
        required: true
    },
})

module.exports = mongoose.model("Burger", burgerSchema)