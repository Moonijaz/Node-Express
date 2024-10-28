// apiServer.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();
const PORT = 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Hardcoded username and password for demonstration
const USERNAME = 'user';
const PASSWORD = 'password';
const JWT_SECRET = 'your_jwt_secret'; // Use a strong secret in a real application

// POST API for logging in
app.post('/signin', (req, res) => {
    const { username, password } = req.body;

    // Validate username and password
    if (username === USERNAME && password === PASSWORD) {
        // Generate a JWT
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }

    // Return 401 if credentials are invalid
    return res.status(401).json({ message: 'Invalid username and/or password.' });
});

// GET API for accessing employee information
app.get('/employees', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No Token.' });
    }

    // Verify the JWT
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Please login to access this resource.' });
        }

        // If verification succeeds, return employee information
        res.status(200).json({ message: 'Access Successful to Employee Endpoint', user: decoded });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`API server is running on http://localhost:${PORT}`);
});
