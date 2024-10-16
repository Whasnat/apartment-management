const pool = require("../config/db");
const {
  createUsersTable,
  createRolesTable,
  createUserRolesTable,
  createBuildingsTable,
  createApartmentsTable,
  createTenantsTable,
  createPaymentsTable,
  createInvoicesTable,
} = require("../queries/schemaQueries");

const createTables = async () => {
  try {
    await pool.query(createUsersTable);
    await pool.query(createRolesTable);
    await pool.query(createUserRolesTable);
    await pool.query(createBuildingsTable);
    await pool.query(createApartmentsTable);
    await pool.query(createTenantsTable);
    await pool.query(createInvoicesTable);
    await pool.query(createPaymentsTable);
    console.log("Tables created successfully.");
  } catch (err) {
    console.error("Error creating tables", err);
  } finally {
    pool.end();
  }
};

createTables();
