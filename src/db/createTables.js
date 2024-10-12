const pool = require('./db');

const createTables = async () => {
    try {
        // Create Users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Users (
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
        `);

        // Create Roles table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Roles (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) UNIQUE NOT NULL,
                description TEXT
            );
        `);

        console.log('Tables created successfully!');
    } catch (err) {
        console.error('Error creating tables:', err);
    } finally {
        pool.end();
    }
};

createTables();
