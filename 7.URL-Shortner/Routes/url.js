// Routes/url.js
const express = require("express");
const { handleGenerateNewUrl, handleGetAnalytics } = require("../Controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewUrl);
router.get("/analytics/:shortId", handleGetAnalytics); // Updated to use dynamic shortId

module.exports = router;
