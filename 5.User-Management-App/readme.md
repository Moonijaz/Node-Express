
# User Management App

## Overview

The User Management App is a simple web application built using Node.js and Express. It allows users to perform basic operations such as creating, retrieving, and deleting user accounts. The app utilizes MongoDB for data storage and implements the MVC (Model-View-Controller) architecture to maintain a clear separation of concerns.

## Features

- List all users
- Create a new user
- Delete a user
- RESTful API endpoints

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Body-parser (for parsing incoming request bodies)
- Nodemon (for development)

## Installation

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or a MongoDB Atlas account for cloud storage

### Steps

1. **Clone the Repository**:
   git clone <repository-url>
   cd user-management-app

2. Install Dependencies:
    npm install
    Create MongoDB Database: Ensure MongoDB is running. You can use MongoDB Compass or the terminal to create a database named usersdb.

3. Run the Application:
    nodemon server.js
    Access the Application: Open your browser and go to http://localhost:3000.

# API Endpoints
1. Get All Users
    URL: /users
    Method: GET
    Description: Retrieves a list of all users.
2. Create a New User
    URL: /users
    Method: POST
    Description: Creates a new user. Requires JSON body with user details.
3. Reqest Body:
    json
    {
        "name": "John Doe",
        "email": "johndoe@example.com"
    }
4. Delete a User
    URL: /users/:id/delete
    Method: POST
    Description: Deletes a user by ID.

# Directory Structure

        user-management-app/
        ├── controllers/
        │   └── userController.js
        ├── models/
        │   └── user.js
        ├── routes/
        │   └── userRoutes.js
        ├── server.js
        ├── package.json
        └── README.md

# Example Usage with Postman
1. Get All Users:

Send a GET request to http://localhost:3000/users.
2. Create a New User:

Send a POST request to http://localhost:3000/users with a JSON body as described above.
Delete a User:

Send a POST request to http://localhost:3000/users/:id/delete where :id is the ID of the user you wish to delete.
Conclusion
This User Management App provides a simple and effective way to manage user accounts. You can expand its functionality by adding features such as user authentication, validation, and frontend integration.






