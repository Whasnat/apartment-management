require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const apartmentRoutes = require('./routes/apartmentRoutes');
const buildingRoutes = require('./routes/buildingRoutes');
const tenantRoutes = require('./routes/tenantRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/owner', buildingRoutes);
app.use('/owner', apartmentRoutes);
app.use('/owner', tenantRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
