// Import necessary modules
const express = require("express");
const path = require("path");
const fs = require("fs").promises; // Using the promises API of fs module for async operations

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3001; // Set the port to 3001 or use the value from environment variable

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from the "public" directory

// API route to get all notes
app.get("/api/notes", async (req, res) => {
  try {
    // Read the notes from the db.json file
    const data = await fs.readFile(path.join(__dirname, "db/db.json"), "utf8");
    res.json(JSON.parse(data)); // Send the parsed notes as a JSON response
  } catch (err) {
    res.status(500).json({ error: "Failed to read notes" }); // Handle errors
  }
});

// API route to save a new note
app.post("/api/notes", async (req, res) => {
  try {
    const { title, text } = req.body; // Extract title and text from request body
    if (!title || !text) {
      return res.status(400).json({ error: "Note must have a title and text" }); // Validate input
    }

    // Read existing notes from db.json
    const data = await fs.readFile(path.join(__dirname, "db/db.json"), "utf8");
    const notes = JSON.parse(data);

    // Create a new note object with a unique id
    const newNote = {
      id: (notes.length + 1).toString(),
      title,
      text,
    };
    notes.push(newNote); // Add the new note to the list

    // Write the updated notes list back to db.json
    await fs.writeFile(
      path.join(__dirname, "db/db.json"),
      JSON.stringify(notes, null, 2)
    );
    res.json(newNote); // Send the new note as a response
  } catch (err) {
    res.status(500).json({ error: "Failed to save note" }); // Handle errors
  }
});

// API route to delete a note by id
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the id from request parameters
    const data = await fs.readFile(path.join(__dirname, "db/db.json"), "utf8");
    const notes = JSON.parse(data);

    // Filter out the note with the given id
    const filteredNotes = notes.filter((note) => note.id !== id);

    // Write the updated notes list back to db.json
    await fs.writeFile(
      path.join(__dirname, "db/db.json"),
      JSON.stringify(filteredNotes, null, 2)
    );
    res.json({ message: "Note deleted" }); // Send a success message
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" }); // Handle errors
  }
});

// Route to serve the notes.html page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Route to serve the index.html page for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});