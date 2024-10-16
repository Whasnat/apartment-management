const pool = require('../config/db');
const { createUsersTable, createRolesTable, createUserRolesTable, createBuildingsTable, createApartmentsTable } = require('../queries/schemaQueries');

const createTables = async () => {
    try {
        await pool.query(createUsersTable);
        await pool.query(createRolesTable);
        await pool.query(createUserRolesTable);
        await pool.query(createBuildingsTable);
        await pool.query(createApartmentsTable);
        console.log('Tables created successfully.');
    } catch (err) {
        console.error('Error creating tables', err);
    } finally {
        pool.end();
    }
};

createTables();
