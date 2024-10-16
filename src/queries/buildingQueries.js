// src/queries/buildingQueries.js

// Insert a new building
const insertBuilding = `
    INSERT INTO buildings (owner_id, name, address)
    VALUES ($1, $2, $3) RETURNING id, name, address;
`;

// Get all buildings owned by the user
const getBuildingsByOwner = `
    SELECT id, name, address FROM buildings WHERE owner_id = $1;
`;

module.exports = {
    insertBuilding,
    getBuildingsByOwner,
};
