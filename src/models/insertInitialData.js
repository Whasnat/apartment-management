const pool = require('../config/db');
const bcrypt = require('bcrypt');
const {
    insertRole,
    insertUser,
    insertUserRole,
    getRoleByName
} = require('../queries/userQueries');

// Function to hash passwords
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Function to insert roles
const insertRoles = async () => {
    const roles = [
        { name: "Admin", description: "System Administrator" },
        { name: "Owner", description: "Building Owner" },
        { name: "Tenant", description: "Apartment Tenant" }
    ];

    try {
        for (let role of roles) {
            await pool.query(insertRole, [role.name, role.description]);
        }
        console.log('Roles inserted successfully.');
    } catch (err) {
        console.error('Error inserting roles', err);
    }
};

// Function to insert users and assign roles
const insertUsers = async () => {
    const users = [
        { username: 'adminUser', email: 'admin@example.com', password: 'adminpass', firstName: 'Admin', lastName: 'User', role: 'Admin' },
        { username: 'ownerUser', email: 'owner@example.com', password: 'ownerpass', firstName: 'Owner', lastName: 'User', role: 'Owner' },
        { username: 'tenantUser', email: 'tenant@example.com', password: 'tenantpass', firstName: 'Tenant', lastName: 'User', role: 'Tenant' },
    ];

    try {
        for (let user of users) {
            // Hash the user's password
            const hashedPassword = await hashPassword(user.password);

            // Insert the user into the database
            const userResult = await pool.query(insertUser, [
                user.username, 
                user.email, 
                hashedPassword, 
                user.firstName, 
                user.lastName
            ]);
            
            const userId = userResult.rows[0].id;

            // Get the role ID by role name
            const roleResult = await pool.query(getRoleByName, [user.role]);
            const roleId = roleResult.rows[0].id;

            // Link the user to the role
            await pool.query(insertUserRole, [userId, roleId]);
        }
        console.log('Users and roles inserted successfully.');
    } catch (err) {
        console.error('Error inserting users and roles', err);
    } finally {
        pool.end();
    }
};

// Insert roles and users
insertRoles().then(insertUsers);
