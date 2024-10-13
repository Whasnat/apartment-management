const bcrypt = require('bcrypt');
const pool = require('./db');
const queries = require('./queries');  // Import the query strings
const validator = require('validator');
const passwordValidator = require('password-validator');

require('dotenv').config();
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

// Password strength validation schema
const schema = new passwordValidator();
schema.is().min(8).has().uppercase().has().lowercase().has().digits(1).has().not().spaces();

// Function to register a new user
const registerUser = async (username, email, password, firstName, lastName, roleName) => {
    try {
        // Validate email
        if (!validator.isEmail(email)) {
            console.error('Invalid email address.');
            return;
        }

        // Validate password
        if (!schema.validate(password)) {
            console.error('Password does not meet security requirements.');
            return;
        }

        // Ensure required fields are not empty
        if (!firstName || !lastName || !username) {
            console.error('All fields are required.');
            return;
        }

        // Start transaction
        await pool.query('BEGIN');

        // Check if user already exists
        const userCheck = await pool.query(queries.CHECK_USER_EXISTS, [email]);
        if (userCheck.rows.length > 0) {
            console.log('User already exists.');
            return;
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Insert new user
        const newUser = await pool.query(queries.CREATE_USER, [
            username, email, passwordHash, firstName, lastName
        ]);
        const userId = newUser.rows[0].id;

        // Get the role ID by name
        const role = await pool.query(queries.GET_ROLE_BY_NAME, [roleName]);
        if (role.rows.length === 0) {
            throw new Error(`Role ${roleName} does not exist`);
        }
        const roleId = role.rows[0].id;

        // Assign the role to the user
        await pool.query(queries.ASSIGN_ROLE, [userId, roleId]);

        // Commit transaction
        await pool.query('COMMIT');

        console.log('User registered successfully with role:', roleName);
    } catch (err) {
        // Rollback in case of error
        await pool.query('ROLLBACK');
        console.error('Error registering user:', err.message);
    } finally {
        pool.end();
    }
};

// Example usage of the function
registerUser('johndoe', 'johndoe@example.com', 'Password123!', 'John', 'Doe', 'Tenant');
