// routes/userRoutes.js
const express = require('express');
const { getAllUsers, createUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

// Route to list all users
router.get('/users', getAllUsers);

// Route to create a new user
router.post('/users', createUser);

// Route to delete a user
router.delete('/users/:id', deleteUser);

module.exports = router;
