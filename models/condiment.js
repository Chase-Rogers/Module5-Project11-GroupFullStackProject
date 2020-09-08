const mongoose = require('mongoose');
const Schema = mongoose.Schema

const condimentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model("Condiment", condimentSchema)