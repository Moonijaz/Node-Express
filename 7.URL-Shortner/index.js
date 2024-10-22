
const express = require("express");
const path = require("path")
const { connectToMondoDB } = require("./connect");

const URL = require("./Models/url");
const urlRoutes = require("./Routes/url");
const staticRoute = require('./Routes/staticRouter');
const userRoute = require("./Routes/user");

const app = express();
const PORT = 8001;

// Connect to MongoDB
connectToMondoDB("mongodb://localhost:27017/url")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection failed:", err));

// Use middleware
app.set("view engine", "ejs"); // for server side rendering
app.set('views', path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/url", urlRoutes); // Routes
app.use("/", staticRoute);
app.use("/user", userRoute);


// Redirect route for shortId
app.get("/:shortId", async (req, res) => {
    try {
        const shortId = req.params.shortId;

        // Find the URL entry and update visit history
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true } // Ensure updated entry is returned
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
