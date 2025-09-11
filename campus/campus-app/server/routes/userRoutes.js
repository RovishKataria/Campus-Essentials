const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Get all users (admin only)
router.get('/', authMiddleware, async (req, res) => {
    res.json({ message: 'Get all users endpoint' });
});

// Get user by ID
router.get('/:id', authMiddleware, async (req, res) => {
    res.json({ message: `Get user ${req.params.id}` });
});

// Update user profile
router.put('/:id', authMiddleware, async (req, res) => {
    res.json({ message: `Update user ${req.params.id}` });
});

// Delete user (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    res.json({ message: `Delete user ${req.params.id}` });
});

module.exports = router;
