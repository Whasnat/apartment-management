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
  createNotificationsTable,
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
    await pool.query(createNotificationsTable);
    console.log("Tables created successfully.");
  } catch (err) {
    console.error("Error creating tables", err);
  } finally {
    pool.end();
  }
};

createTables();
