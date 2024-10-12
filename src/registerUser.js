const bcrypt = require('bcrypt');
const pool = require('./db');

// Function to register a new user with role assignment
const registerUser = async (username, email, password, firstName, lastName, roleName) => {
    try {
        // Start a transaction to ensure atomic operations
        await pool.query('BEGIN');
        // Check if the user already exists
        const userCheck = await pool.query('SELECT id FROM Users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            console.log('User already exists.');
            return;
        }

        // Hash the user's password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Insert the new user into the Users table
        const newUser = await pool.query(
            'INSERT INTO Users (username, email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [username, email, passwordHash, firstName, lastName]
        );

        const userId = newUser.rows[0].id;

        // Get the role ID by name
        const role = await pool.query('SELECT id FROM Roles WHERE name = $1', [roleName]);
        if (role.rows.length === 0) {
            throw new Error(`Role ${roleName} does not exist`);
        }
        const roleId = role.rows[0].id;

        // Assign the role to the user
        await pool.query('INSERT INTO User_Roles (user_id, role_id) VALUES ($1, $2)', [userId, roleId]);

        // Commit the transaction
        await pool.query('COMMIT');

        console.log('User registered successfully with role:', roleName);
    } catch (err) {
        // Rollback the transaction in case of any error
        await pool.query('ROLLBACK');
        console.error('Error registering user:', err.message);
    } finally {
        pool.end();
    }
};

// Example of registering a new user
registerUser('johndoe', 'johndoe@example.com', 'password123', 'John', 'Doe', 'Tenant');