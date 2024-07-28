// Import the express and path modules
const express = require("express");
const path = require("path");
// Create a new router object
const router = express.Router();

// Route to serve the notes.html page
router.get("/notes", (req, res) => {
  // Send the notes.html file when the /notes route is accessed
  res.sendFile(path.join(__dirname, "../notes.html"));
});

// Route to serve the index.html page for all other routes
router.get("/html", (req, res) => {
  // Send the index.html file when the /html route is accessed
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Export the router object so it can be used in other parts of the application
module.exports = router;