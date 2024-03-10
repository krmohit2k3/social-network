// routes/post.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Post = require('../models/post');

// Create post
router.post('/', verifyToken, async (req, res) => {
  try {
    const newPost = new Post({ ...req.body, userId: req.userId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get all posts
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find().sort({ timestamp: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Update post
router.put('/:postId', verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete post
router.delete('/:postId', verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.send('Post deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
