const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        phone_number VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const createRolesTable = `
    CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        description TEXT
    );
`;

const createUserRolesTable = `
    CREATE TABLE IF NOT EXISTS user_roles (
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
        assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, role_id)
    );
`;

// Create Buildings Table
const createBuildingsTable = `
    CREATE TABLE IF NOT EXISTS buildings (
        id SERIAL PRIMARY KEY,
        owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        address TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

// Create Apartments Table
const createApartmentsTable = `
    CREATE TABLE IF NOT EXISTS apartments (
        id SERIAL PRIMARY KEY,
        building_id INTEGER REFERENCES buildings(id) ON DELETE CASCADE,
        unit_number VARCHAR(10) NOT NULL,
        status VARCHAR(20) NOT NULL CHECK (status IN ('vacant', 'occupied')),
        rent_amount DECIMAL(10, 2) NOT NULL,
        utility_breakdown JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

// Create Tenants Table
const createTenantsTable = `
    CREATE TABLE IF NOT EXISTS tenants (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        apartment_id INTEGER REFERENCES apartments(id) ON DELETE SET NULL,
        move_in_date DATE NOT NULL,
        move_out_date DATE DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

// Create Payments Table
const createPaymentsTable = `
    CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        tenant_id INTEGER REFERENCES tenants(id) ON DELETE CASCADE,
        invoice_id INTEGER REFERENCES invoices(id) ON DELETE SET NULL,
        amount DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('bank_transfer', 'Bkash', 'Nagad', 'Rocket')),
        status VARCHAR(20) NOT NULL CHECK (status IN ('paid', 'pending', 'overdue')),
        transaction_id VARCHAR(100) UNIQUE,
        payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

// Create Invoices Table
const createInvoicesTable = `
    CREATE TABLE IF NOT EXISTS invoices (
        id SERIAL PRIMARY KEY,
        tenant_id INTEGER REFERENCES tenants(id) ON DELETE CASCADE,
        amount DECIMAL(10, 2) NOT NULL,
        due_date DATE NOT NULL,
        status VARCHAR(20) NOT NULL CHECK (status IN ('generated', 'sent', 'paid', 'overdue')),
        delivery_method VARCHAR(50) NOT NULL CHECK (delivery_method IN ('WhatsApp', 'Messenger', 'Email')),
        generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        sent_at TIMESTAMP,
        paid_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

module.exports = {
  createUsersTable,
  createRolesTable,
  createUserRolesTable,
  createBuildingsTable,
  createApartmentsTable,
  createTenantsTable,
  createPaymentsTable,
  createInvoicesTable,
};
