const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const pool = require("../config/db");

const router = express.Router();

// Admin-only route: List all users
router.get("/users", authenticateToken(["Admin"]), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT users.id, users.username, users.email, roles.name AS role FROM users JOIN user_roles ON users.id = user_roles.user_id JOIN roles ON user_roles.role_id = roles.id`
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Protected route: Get user profile
router.get('/profile', authenticateToken, (req, res) => {
  console.log('Inside /profile route');  // Debug log
  res.json({ message: 'Profile route is working' });
  // const user = req.user;  // Access the decoded user data from the token
    // res.json({
    //     message: `Hello, ${user.username}! Welcome to your profile.`,
    //     user: {
    //         userId: user.userId,
    //         username: user.username,
    //         role: user.role
    //     }
    // });
});

module.exports = router;
