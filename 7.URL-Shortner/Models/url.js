// Import mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Define a schema for the URL model
const urlSchema = new mongoose.Schema(
    {
        // Unique identifier for the shortened URL
        shortId: {
            type: String, 
            required: true, 
            unique: true, 
        },
        redirectURL: {
            type: String,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        visitHistory: [
            { 
                timestamp: { type: Number } 
            }
        ],
    },
    { timestamps: true } 
);

// Create a Mongoose model for the URL schema
const URL = mongoose.model("URL", urlSchema);

module.exports = URL;