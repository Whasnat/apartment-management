const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Owner-only route: List all apartments managed by the owner
router.get('/apartments', authenticateToken(['Owner']), async (req, res) => {
    try {
        // Assume apartments are linked to users through the user_id
        const result = await pool.query('SELECT * FROM apartments WHERE owner_id = $1', [req.user.userId]);
        return res.json(result.rows);
    } catch (err) {
        console.error('Error fetching apartments:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
