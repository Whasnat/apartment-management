// src/queries/tenantQueries.js

// Insert a new tenant (assign tenant to an apartment)
const insertTenant = `
    INSERT INTO tenants (user_id, apartment_id, move_in_date)
    VALUES ($1, $2, $3) RETURNING id, user_id, apartment_id, move_in_date, move_out_date;
`;

// Update tenant details (e.g., move-out date)
const updateTenant = `
    UPDATE tenants SET move_out_date = $1 WHERE id = $2 RETURNING *;
`;

// Get all tenants in a building (join apartments)
const getTenantsByBuilding = `
    SELECT tenants.id, users.username, tenants.apartment_id, tenants.move_in_date, tenants.move_out_date, apartments.unit_number
    FROM tenants
    JOIN apartments ON tenants.apartment_id = apartments.id
    JOIN users ON tenants.user_id = users.id
    WHERE apartments.building_id = $1;
`;

module.exports = {
    insertTenant,
    updateTenant,
    getTenantsByBuilding,
};
