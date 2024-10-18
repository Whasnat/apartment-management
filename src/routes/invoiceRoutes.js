const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const pool = require('../config/db');
const invoiceQueries = require('../queries/invoiceQueries');
const notificationQueries = require('../queries/notificationQueries');

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
router.get('/invoices/:tenantId', authenticateToken(['Tenant','Owner']), async (req, res) => {
    const tenantId = req.params.tenantId;

    try {
        const result = await pool.query(invoiceQueries.getInvoicesByTenant, [tenantId]);
        return res.json(result.rows);
    } catch (err) {
        console.error('Error fetching invoices:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});




// Mark overdue invoices and send notifications
router.put('/invoices/mark-overdue', authenticateToken(['Owner', 'Admin']), async (req, res) => {
    try {
        const overdueInvoices = await pool.query(invoiceQueries.markInvoicesAsOverdue);
        const notifications = [];

        for (const invoice of overdueInvoices.rows) {
            // Check if tenant_id is valid before creating notification
            const tenant = await pool.query('SELECT * FROM tenants WHERE id = $1', [invoice.tenant_id]);

            if (tenant.rows.length === 0) {
                console.log(`Invalid tenant_id: ${invoice.tenant_id}, skipping notification.`);
                continue;  // Skip creating notification if tenant is invalid
            }

            const message = `Your invoice with ID ${invoice.id} is overdue. Please pay ${invoice.amount} as soon as possible.`;

            // Insert notification for the tenant
            const notificationResult = await pool.query(notificationQueries.insertNotification, [
                invoice.tenant_id,
                message
            ]);

            notifications.push(notificationResult.rows[0]);
        }

        return res.json({ message: 'Overdue invoices updated and notifications sent', overdueInvoices: overdueInvoices.rows, notifications });
    } catch (err) {
        console.error('Error marking invoices as overdue:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;
