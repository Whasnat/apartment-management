const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const pool = require('../config/db');
const invoiceQueries = require('../queries/invoiceQueries');

const router = express.Router();

// Owner-only route: Generate an invoice for a tenant
router.post('/invoices', authenticateToken(['Owner']), async (req, res) => {
    const { tenant_id, amount, due_date, delivery_method } = req.body;

    try {
        const result = await pool.query(invoiceQueries.insertInvoice, [
            tenant_id, amount, due_date, 'generated', delivery_method
        ]);
        return res.json(result.rows[0]);
    } catch (err) {
        console.error('Error generating invoice:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Tenant-only route: Get invoices by tenant
router.get('/invoices/:tenantId', authenticateToken(['Tenant']), async (req, res) => {
    const tenantId = req.params.tenantId;

    try {
        const result = await pool.query(invoiceQueries.getInvoicesByTenant, [tenantId]);
        return res.json(result.rows);
    } catch (err) {
        console.error('Error fetching invoices:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// Mark overdue invoices
router.put('/invoices/mark-overdue', authenticateToken(['Owner', 'Admin']), async (req, res) => {
    try {
        const result = await pool.query(invoiceQueries.markInvoicesAsOverdue);
        return res.json({ message: 'Overdue invoices updated', overdueInvoices: result.rows });
    } catch (err) {
        console.error('Error marking invoices as overdue:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
