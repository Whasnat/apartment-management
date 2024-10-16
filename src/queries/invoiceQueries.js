// src/queries/invoiceQueries.js

// Insert a new invoice
const insertInvoice = `
    INSERT INTO invoices (tenant_id, amount, due_date, status, delivery_method)
    VALUES ($1, $2, $3, $4, $5) RETURNING id, amount, due_date, status, delivery_method, generated_at;
`;

// Get invoices for a tenant
const getInvoicesByTenant = `
    SELECT * FROM invoices WHERE tenant_id = $1;
`;


// Update overdue invoices
const markInvoicesAsOverdue = `
    UPDATE invoices
    SET status = 'overdue'
    WHERE due_date < CURRENT_DATE AND status != 'paid'
    RETURNING id, tenant_id, amount, due_date, status;
`;

module.exports = {
    insertInvoice,
    getInvoicesByTenant,
    markInvoicesAsOverdue,
};
