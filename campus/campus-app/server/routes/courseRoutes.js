const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Get all courses
router.get('/', async (req, res) => {
    res.json({ message: 'Get all courses' });
});

// Get course by ID
router.get('/:id', async (req, res) => {
    res.json({ message: `Get course ${req.params.id}` });
});

// Create new course (teacher/admin only)
router.post('/', authMiddleware, async (req, res) => {
    res.json({ message: 'Create new course' });
});

// Update course (teacher/admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    res.json({ message: `Update course ${req.params.id}` });
});

// Delete course (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    res.json({ message: `Delete course ${req.params.id}` });
});

// Enroll in course
router.post('/:id/enroll', authMiddleware, async (req, res) => {
    res.json({ message: `Enroll in course ${req.params.id}` });
});

module.exports = router;
