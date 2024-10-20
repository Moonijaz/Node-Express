// Import mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Define a schema for the URL model
const urlSchema = new mongoose.Schema(
    {
        // Unique identifier for the shortened URL
        shortId: {
            type: String, // Data type is String
            required: true, // This field is mandatory
            unique: true, // This field must be unique across all documents
        },
        // Original URL that the short ID redirects to
        redirectURL: {
            type: String, // Data type is String
            required: true, // This field is mandatory
        },
        // Array to store the history of visits to the shortened URL
        visitHistory: [
            { 
                timestamp: { type: Number } // Each visit records a timestamp
            }
        ],
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create a Mongoose model for the URL schema
const URL = mongoose.model("URL", urlSchema);

// Export the URL model for use in other parts of the application
module.exports = URL;
