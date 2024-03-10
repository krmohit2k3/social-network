const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Follow = require('../models/follow');

// Follow user
router.post('/:userId', verifyToken, async (req, res) => {
  try {
    const follow = new Follow({ followerId: req.userId, followingId: req.params.userId });
    await follow.save();
    res.status(201).json(follow);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Unfollow user
router.delete('/:userId', verifyToken, async (req, res) => {
  try {
    await Follow.findOneAndDelete({ followerId: req.userId, followingId: req.params.userId });
    res.send('Unfollowed successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
