// Insert data into Roles, Users & User_Role tables


// Corrected Insert Role Query
const insertRole = `
    INSERT INTO roles (name, description) 
    VALUES ($1, $2) 
    ON CONFLICT (name) DO NOTHING;
`;


//INSERT USERS
const insertUser =`
    INSERT INTO users (username, email, password_hash, first_name, last_name) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING id;
`;


// Link user to role
const insertUserRole = `
    INSERT INTO user_roles (user_id, role_id) 
    VALUES ($1, $2);
`;


// Get role by name
const getRoleByName = `
    SELECT id FROM roles WHERE name = $1;
`;


// Get user by username and join with the roles table
const getUserByUsername = `
    SELECT users.id, users.username, users.email, users.password_hash, roles.name AS role
    FROM users
    JOIN user_roles ON users.id = user_roles.user_id
    JOIN roles ON user_roles.role_id = roles.id
    WHERE users.username = $1;
`;



module.exports = {
    insertRole,
    insertUser,
    insertUserRole,
    getRoleByName,
    getUserByUsername,
};