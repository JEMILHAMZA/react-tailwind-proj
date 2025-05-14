const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Post (Protected)
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new Post({ title, content, userId: req.user.id });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get All Posts of Logged-in User
router.get("/", authMiddleware, async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.user.id });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get Single Post (Protected)
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, userId: req.user.id });
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Update Post (Protected)
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { title, content },
            { new: true }
        );
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Delete Post (Protected)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
