// controllers/userController.js
const User = require('../models/User'); // Make sure the path is correct

// Function to get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json(users); // Send the users as a response
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

// Function to create a new user
const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body); // Create a new user instance
        await newUser.save(); // Save the user to the database
        res.status(201).json(newUser); // Respond with the created user
    } catch (error) {
        res.status(400).json({ error: 'Error creating user' });
    }
};

// Function to delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Get the user ID from the request parameters
        await User.findByIdAndDelete(id); // Delete the user by ID
        res.status(204).send(); // Respond with no content
    } catch (error) {
        res.status(400).json({ error: 'Error deleting user' });
    }
};

module.exports = { getAllUsers, createUser, deleteUser };
