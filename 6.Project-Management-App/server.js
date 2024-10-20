// server.js
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes'); // Importing product routes

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json()); // This replaces body-parser

// Use product routes for all incoming requests
app.use(productRoutes); // Ensure that productRoutes are set up correctly

// Function to start the server and connect to MongoDB
const startServer = async () => {
    const PORT = 3000; // Define the port number
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/productsdb'); // Adjust the connection string if needed
        console.log('Connected to MongoDB'); // Log success

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`); // Log server running
        });
    } catch (err) {
        console.error('MongoDB connection error:', err); // Log connection errors
    }
};

// Start the server
startServer();
