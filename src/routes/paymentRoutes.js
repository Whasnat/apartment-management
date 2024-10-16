const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const pool = require('../config/db');
const paymentQueries = require('../queries/paymentQueries');

const router = express.Router();

// Tenant-only route: Make a payment
router.post('/payments', authenticateToken(['Tenant']), async (req, res) => {
    const { tenant_id, invoice_id, amount, payment_method, transaction_id } = req.body;

    try {
        const result = await pool.query(paymentQueries.insertPayment, [
            tenant_id, invoice_id, amount, payment_method, 'paid', transaction_id
        ]);
        return res.json(result.rows[0]);
    } catch (err) {
        console.error('Error making payment:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Tenant-only route: Get payments by tenant
router.get('/payments/:tenantId', authenticateToken(['Tenant']), async (req, res) => {
    const tenantId = req.params.tenantId;

    try {
        const result = await pool.query(paymentQueries.getPaymentsByTenant, [tenantId]);
        return res.json(result.rows);
    } catch (err) {
        console.error('Error fetching payments:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
