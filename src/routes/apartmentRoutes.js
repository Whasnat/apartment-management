const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const pool = require('../config/db');
const apartmentQueries = require('../queries/apartmentQueries');

const router = express.Router();

// Owner-only route: Add an apartment to a building
router.post('/apartments', authenticateToken(['Owner']), async (req, res) => {
    const { building_id, unit_number, status, rent_amount, utility_breakdown } = req.body;

    try {
        const result = await pool.query(apartmentQueries.insertApartment, [
            building_id, unit_number, status, rent_amount, utility_breakdown
        ]);
        return res.json(result.rows[0]);
    } catch (err) {
        console.error('Error adding apartment:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Owner-only route: Get apartments in a building
router.get('/apartments/:buildingId', authenticateToken(['Owner']), async (req, res) => {
    const buildingId = req.params.buildingId;

    try {
        const result = await pool.query(apartmentQueries.getApartmentsByBuilding, [buildingId]);
        return res.json(result.rows);
    } catch (err) {
        console.error('Error fetching apartments:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
