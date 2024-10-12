// queries.js

// User-related queries
const CREATE_USER = `
    INSERT INTO Users (username, email, password_hash, first_name, last_name) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING id
`;

const CHECK_USER_EXISTS = `
    SELECT id FROM Users WHERE email = $1
`;

const ASSIGN_ROLE = `
    INSERT INTO User_Roles (user_id, role_id) VALUES ($1, $2)
`;

const GET_ROLE_BY_NAME = `
    SELECT id FROM Roles WHERE name = $1
`;

module.exports = {
    CREATE_USER,
    CHECK_USER_EXISTS,
    ASSIGN_ROLE,
    GET_ROLE_BY_NAME,
};
