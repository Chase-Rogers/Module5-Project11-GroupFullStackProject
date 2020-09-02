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

module.exports = mongoose.model("Side", sideSchema)