// server.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Adjust the path as needed

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Use user routes
app.use('/', userRoutes);

// Connect to MongoDB and start the server
const startServer = async () => {
    const PORT = 3000;
    try {
        await mongoose.connect('mongodb://localhost:27017/usersdb'); // Adjust the connection string if needed
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

startServer();
