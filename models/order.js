const mongoose = require("mongoose");
const Burger = require("./burger").schema;
const Side = require("./side").schema;
const Drink = require("./drink").schema;
const Condiment = require("./condiment").schema;
const Combo = require("./combo").schema;
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    menuItems: {
        type: [Drink, Burger, Side, Condiment, Combo],
        quantity: Number,
        required: false
    },
    total: {
        type: Number,
        required: true,
    },
    taxes: {
        type: Number,
        required: true,
    },
    subTotal: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Order", orderSchema);
