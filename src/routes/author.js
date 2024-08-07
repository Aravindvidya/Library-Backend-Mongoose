const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// Get all authors
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get author by ID
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new author
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
    bio: req.body.bio,
    website: req.body.website,
  });

  try {
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update author details
router.patch("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      if (req.body.name != null) author.name = req.body.name;
      if (req.body.bio != null) author.bio = req.body.bio;
      if (req.body.website != null) author.website = req.body.website;
      const updatedAuthor = await author.save();
      res.json(updatedAuthor);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an author
router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      await author.remove();
      res.json({ message: "Author deleted" });
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
