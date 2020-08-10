const mongoose = require('mongoose');
const Schema = mongoose.Schema

const condimentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Condiment", condimentSchema)