const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Get all announcements
router.get('/', async (req, res) => {
    res.json({ message: 'Get all announcements' });
});

// Get announcement by ID
router.get('/:id', async (req, res) => {
    res.json({ message: `Get announcement ${req.params.id}` });
});

// Create new announcement (teacher/admin only)
router.post('/', authMiddleware, async (req, res) => {
    res.json({ message: 'Create new announcement' });
});

// Update announcement (teacher/admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    res.json({ message: `Update announcement ${req.params.id}` });
});

// Delete announcement (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    res.json({ message: `Delete announcement ${req.params.id}` });
});

module.exports = router;
