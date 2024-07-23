const mongoose = require('mongoose'); // Importing Mongoose for MongoDB interaction

// Defining a schema for the Product model
const productSchema = mongoose.Schema({
    name: String, // Name of the product
    image: String, // URL of the product image
    countInStock: {
        type: Number, // Number of items in stock
        required: true // Making this field required
    }
});

// Creating a Mongoose model based on the schema
const Product = mongoose.model('Product', productSchema);

// Exporting the Product model to use in other parts of the application
module.exports = Product;
