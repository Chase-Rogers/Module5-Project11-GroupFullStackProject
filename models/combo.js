const mongoose = require('mongoose');
const Burger = require('./burger').schema;
const Side = require('./side').schema
const Drink = require('./drink').schema
const Schema = mongoose.Schema

const comboSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    drink: {
        type: Drink,
        required: true
    },
    burger: {
        type: Burger,
        required: true
    },
    side: {
        type: Side,
        required: true
    },
    quantity: Number,
    required: false

})

module.exports = mongoose.model("Combo", comboSchema)