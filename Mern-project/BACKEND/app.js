const express = require('express');  // Importing the Express library
const app = express();  // Creating an instance of an Express application
const morgan = require('morgan');  // Importing Morgan for logging HTTP requests
const mongoose = require('mongoose');  // Importing Mongoose for MongoDB interaction

// Accessing environment variables from the .env file
require("dotenv/config");
const api = process.env.API_URL;  // Getting the API base URL from environment variables

// Middleware to parse JSON request bodies
app.use(express.json());  // Converts request body into JSON format
app.use(morgan('tiny'));  // Logs details of each HTTP request (method, URL, status, etc.)

// Define a Mongoose schema for the Product model
const productSchema = mongoose.Schema({
    name: String,  // Product name
    image: String,  // URL of the product image
    countInStock: {      // Number of items in stock
        type: Number,
        required : true
    }  
});
const Product = mongoose.model('Product', productSchema);  // Creating a Mongoose model based on the schema

// Route to handle GET requests for products
app.get(api + '/products', (req, res) => {
    const productList = Product.find();
    // console.log(product);  // Logging the product object
    res.send(productList);  // Sending the product object as the response
});

// Route to handle POST requests for creating a new product
app.post(api + '/products', (req, res) => {
    // Creating a new instance of the Product model with data from the request body
    const product = new Product({
        name: req.body.name,  // Product name from the request body
        image: req.body.image,  // Product image URL from the request body
        countInStock: req.body.countInStock  // Number of items in stock from the request body
    });

    // Saving the new product to the database
    product.save()
        .then((createdProduct) => {
            res.status(201).json(createdProduct);  // Responding with the created product and status 201
        })
        .catch((err) => {
            res.status(500).json({  // Responding with error status and message
                error: err,
                success: false
            });
        });
});

// Connecting to the MongoDB database
mongoose.connect('mongodb://localhost:27017/eshop-database')  // Connect to the specified database
    .then(() => {
        console.log("Database connected");  // Log success message
    })
    .catch((err) => {
        console.log(err);  // Log error if connection fails
    });

// Starting the Express server
app.listen(4000, () => {
    console.log(api);  // Log the API base URL
    console.log('Server Started');  // Log server start message
});
