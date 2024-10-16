// src/queries/apartmentQueries.js

// Insert a new apartment
const insertApartment = `
    INSERT INTO apartments (building_id, unit_number, status, rent_amount, utility_breakdown)
    VALUES ($1, $2, $3, $4, $5) RETURNING id, unit_number, status, rent_amount, utility_breakdown;
`;

// Get all apartments in a building
const getApartmentsByBuilding = `
    SELECT id, unit_number, status, rent_amount, utility_breakdown
    FROM apartments WHERE building_id = $1;
`;

module.exports = {
    insertApartment,
    getApartmentsByBuilding,
};
