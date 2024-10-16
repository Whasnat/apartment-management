const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const pool = require('../config/db');
const buildingQueries = require('../queries/buildingQueries');

const router = express.Router();

// Owner-only route: Add a building
router.post('/buildings', authenticateToken(['Owner']), async (req, res) => {
    const { name, address } = req.body;
    const ownerId = req.user.userId;

    try {
        const result = await pool.query(buildingQueries.insertBuilding, [ownerId, name, address]);
        return res.json(result.rows[0]);
    } catch (err) {
        console.error('Error adding building:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Owner-only route: Get all buildings
router.get('/buildings', authenticateToken(['Owner']), async (req, res) => {
    const ownerId = req.user.userId;

    try {
        const result = await pool.query(buildingQueries.getBuildingsByOwner, [ownerId]);
        return res.json(result.rows);
    } catch (err) {
        console.error('Error fetching buildings:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
