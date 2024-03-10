const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const User = require('../models/user');

// Get user profile
router.get('/:userId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) 
    return res.status(404).send('User not found.');

    res.json(user);
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Update user profile
router.put('/:userId', verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.json(updatedUser);
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete user profile
router.delete('/:userId', verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.send('User deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
