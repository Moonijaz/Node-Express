const express = require("express");
const path = require("path");
const mongoose = require("mongoose"); // moved mongoose import here
const cookieParser = require('cookie-parser');
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");
const URL = require("./Models/url");
const urlRoutes = require("./Routes/url");
const staticRoute = require('./Routes/staticRouter');
const userRoute = require("./Routes/user");

const app = express();
const PORT = process.env.PORT || 8001;

// MongoDB connection function
async function connectToMongoDB(url) {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

// Connect to MongoDB
connectToMongoDB("mongodb://localhost:27017/url");

// Set up middleware and view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Define routes
app.use("/url", restrictToLoggedInUserOnly, urlRoutes);
app.use("/", staticRoute);
app.use("/user", checkAuth, userRoute);

// Redirect route for shortId
app.get("/:shortId", async (req, res) => {
    try {
        const shortId = req.params.shortId;

        // Find the URL entry and update visit history
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true }
        );

        // Handle the case where no entry is found
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // Redirect to the original URL
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error during redirect:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
