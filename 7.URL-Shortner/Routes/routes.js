const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../Controllers/user");
const { handleGenerateNewUrl, handleGetAnalytics } = require("../Controllers/url");
const URL = require("../Models/url");

const router = express.Router();

// User routes
router.post('/', handleUserSignup);
router.post('/login', handleUserLogin);

// URL routes
router.post("/url", handleGenerateNewUrl);
router.get("/url/analytics/:shortId", handleGetAnalytics);

// Static routes
router.get('/', async (req, res) => {
    const allurls = await URL.find({});
    return res.render("home", { urls: allurls });
});
router.get("/signup", (req, res) => {
    return res.render("signup");
});
router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;
