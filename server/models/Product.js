const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: 1,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 50000
    }, 
    price: {
        type: Number,
        required: true,
        maxlength: 255
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    instruments: {
        type: Array,
        default: []
    },
    availability: {
        type: String
    },
    sampleLength: {
        type: Number
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    publish: {
        required: true,
        type: Boolean
    },
    images: {
        type: Array,
        default: []
    }
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };