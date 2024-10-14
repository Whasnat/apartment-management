const jwt = require("jsonwebtoken");

// Middleware to verify JWT token and enforce role-based access
const authenticateToken = (requiredRoles = []) => {
  return (req, res, next) => {
    console.log("Checking token"); // Debug log

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract token

    if (!token) {
      console.log("Token missing");
      return res.status(401).json({ message: "Access denied, token missing" });
    }

    try {
      // Verify the token
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user; // Attach decoded user data to req.user
      console.log("User authenticated:", user); // Debug log

      console.log("User role:", user.role); // Add this to check the role
      console.log("Required roles:", requiredRoles); // Check what roles are required

      // Check if the user has the required role(s)
      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        console.log("Insufficient permissions");
        return res
          .status(403)
          .json({ message: "Access denied, insufficient permissions" });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      console.log("Invalid token");
      console.error("Token verification failed:", err); // Add error logging for debugging
      return res.status(403).json({ message: "Invalid token" });
    }
  };
};

module.exports = authenticateToken;
