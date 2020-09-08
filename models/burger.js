const mongoose = require('mongoose');
const Condiment = require('./condiment').schema;
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
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    condiments: {
        type: [Condiment],
    },


})

const burgerModel = mongoose.model("Burger", burgerSchema)

module.exports = burgerModel