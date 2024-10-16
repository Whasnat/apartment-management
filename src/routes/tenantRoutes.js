const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const pool = require('../config/db');
const tenantQueries = require('../queries/tenantQueries');

const router = express.Router();

// Owner-only route: Assign tenant to an apartment
router.post('/tenants', authenticateToken(['Owner']), async (req, res) => {
    const { user_id, apartment_id, move_in_date } = req.body;

    try {
        const result = await pool.query(tenantQueries.insertTenant, [user_id, apartment_id, move_in_date]);
        return res.json(result.rows[0]);
    } catch (err) {
        console.error('Error assigning tenant:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Owner-only route: Update tenant (move-out)
router.put('/tenants/:tenantId/move-out', authenticateToken(['Owner']), async (req, res) => {
    const tenantId = req.params.tenantId;
    const { move_out_date } = req.body;

    try {
        const result = await pool.query(tenantQueries.updateTenant, [move_out_date, tenantId]);
        return res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating tenant:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Owner-only route: Get tenants in a building
router.get('/tenants/building/:buildingId', authenticateToken(['Owner']), async (req, res) => {
    const buildingId = req.params.buildingId;

    try {
        const result = await pool.query(tenantQueries.getTenantsByBuilding, [buildingId]);
        return res.json(result.rows);
    } catch (err) {
        console.error('Error fetching tenants:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
