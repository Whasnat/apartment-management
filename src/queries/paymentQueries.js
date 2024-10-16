// src/queries/paymentQueries.js

// Insert a new payment
const insertPayment = `
    INSERT INTO payments (tenant_id, invoice_id, amount, payment_method, status, transaction_id)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, amount, payment_method, status, transaction_id, payment_date;
`;

// Get payments for a tenant
const getPaymentsByTenant = `
    SELECT * FROM payments WHERE tenant_id = $1;
`;

module.exports = {
    insertPayment,
    getPaymentsByTenant,
};
