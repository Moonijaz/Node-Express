const mongoose = require('mongoose'); // Importing Mongoose for MongoDB interaction

// Defining a schema for the Product model
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    description:{
        type: String,
        required: true,
    },
    richDescription:{
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    }, 
    images: {
        type: String
    }, 
    brand: {
        type: String,
        default: ""
    },     
    price: {
        type: Number,
        default: 0
    },     
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },     
    countInStock: {
        type: Number, 
        required: true,
        min: 0,
        max: 255 
    },
    rating: {
        type: Number,
        default: 0
    }, 
    numReviews: {
        type: Number,
        default: 0
    }, 
    isFeatured: {
        type: Boolean,
        default: false,
    }, 
    dateCreated: {
        type: Date,
        default: Date.now,
    }, 
});

// Creating a Mongoose model based on the schema
const Product = mongoose.model('Product', productSchema);

// Exporting the Product model to use in other parts of the application
module.exports = Product;
