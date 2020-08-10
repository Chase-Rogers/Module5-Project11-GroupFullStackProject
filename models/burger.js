const mongoose = require('mongoose');
const Condiment = require('./condiment');
const Schema = mongoose.Schema

const burgerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    condiment: [Condiment],

})

module.exports = mongoose.model("Burger", burgerSchema)