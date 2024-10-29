// Import the shortid library to generate unique IDs 
const shortid = require("shortid");
// Import the URL model to interact with the database
const URL = require("../Models/url");

// Function to handle generating a new shortened URL
async function handleGenerateNewUrl(req, res) {
    const body = req.body; // Extract the request body

    // Check if the 'url' field is present in the request body
    if (!body.url) {
        return res.status(400).json({ error: "url is required" }); // Respond with a 400 error if not
    }

    const shortID = shortid.generate(); // Generate a unique short ID
    // Create a new entry in the URL collection
    await URL.create({
        shortId: shortID, // Assign the generated short ID
        redirectURL: body.url, 
        createdBy: req.user._id,
        visitHistory: [], 
    });

    // Respond with the generated short ID
    return res.render("home",{
        id: shortID,
    } );
}



// Function to handle retrieving analytics for a shortened URL
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId; // Extract the short ID from the request parameters
    
    try {
        // Find the URL document in the database by shortId
        const result = await URL.findOne({ shortId });
        if (!result) {
            // If the URL is not found, respond with a 404 error
            return res.status(404).json({ error: "Short URL not found" });
        }
        // Respond with the total clicks and visit history
        return res.json({
            totalClicks: result.visitHistory.length, // Count the number of visits
            analytics: result.visitHistory // Return the visit history
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        // Respond with a 500 error for internal server issues
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Export the functions for use in other parts of the application
module.exports = { handleGenerateNewUrl, handleGetAnalytics };