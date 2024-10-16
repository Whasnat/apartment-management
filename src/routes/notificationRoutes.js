const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const pool = require('../config/db');

const router = express.Router();

// Tenant/Owner route: Get notifications for the user
router.get('/notifications', authenticateToken(['Owner', 'Tenant']), async (req, res) => {
    const userId = req.user.userId;

    try {
        const result = await pool.query('SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        return res.json(result.rows);
    } catch (err) {
        console.error('Error fetching notifications:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
