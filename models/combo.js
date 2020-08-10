const mongoose = require('mongoose');
const Burger = require('./burger');
const Side = require('./side')
const Drink = require('./drink')
const Schema = mongoose.Schema

const comboSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    drink: [Drink],
    burger: [Burger],
    side: [Side]

})

module.exports = mongoose.model("Burger", burgerSchema)