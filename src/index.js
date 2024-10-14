require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
