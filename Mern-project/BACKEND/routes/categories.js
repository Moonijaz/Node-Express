const express = require('express'); // Importing Express library
const router = express.Router(); // Creating an Express router
const Category = require('../models/category'); // Importing the Category model

// Route to handle GET requests for categories
router.get('/', async (req, res) => {
    try {
        const categoryList = await Category.find(); // Fetch all categories
        res.send(categoryList); // Send the list of categories as the response
    } catch (error) {
        res.status(500).json({ success: false, error }); // Handle errors
    }
});

// Route to handle POST requests for creating a new category
router.post('/', async (req, res) => {
    try {
        let category = new Category({
            name: req.body.name, // Category name from the request body
            icon: req.body.icon, // Category icon from the request body
            color: req.body.color // Category color from the request body
        });
        category = await category.save(); // Save the new category to the database
        res.send(category); // Send the created category as the response
    } catch (error) {
        res.status(404).send('The category cannot be created'); // Handle errors
    }
});

module.exports = router; // Exporting the router to use in other parts of the application
