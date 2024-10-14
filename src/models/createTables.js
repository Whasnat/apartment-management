const pool = require('../config/db');
const { createUsersTable, createRolesTable, createUserRolesTable } = require('../queries/schemaQueries');

const createTables = async () => {
    try {
        await pool.query(createUsersTable);
        await pool.query(createRolesTable);
        await pool.query(createUserRolesTable);
        console.log('Tables created successfully.');
    } catch (err) {
        console.error('Error creating tables', err);
    } finally {
        pool.end();
    }
};

createTables();
