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


// Get user by username
const getUserByUsername = `
    SELECT * FROM users WHERE username = $1;
`;



module.exports = {
    insertRole,
    insertUser,
    insertUserRole,
    getRoleByName,
    getUserByUsername,
};