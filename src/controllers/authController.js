const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userQueries = require('../queries/userQueries');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Fetch the user by username
        const result = await pool.query(userQueries.getUserByUsername, [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = result.rows[0];

        // Compare the password with the stored hash
        const isPasswordMatch = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token, including the role
        const token = jwt.sign(
            { userId: user.id, username: user.username, role: user.role },  // Include role
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
