require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const buildingRoutes = require("./routes/buildingRoutes");
const apartmentRoutes = require("./routes/apartmentRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const paymentRoutes = require("./routes/paymentRoutes"); // Import payment routes
const invoiceRoutes = require("./routes/invoiceRoutes"); // Import invoice routes
const notificationRoutes = require('./routes/notificationRoutes');  // Import notification routes


const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/owner", buildingRoutes);
app.use("/owner", apartmentRoutes);
app.use("/owner", tenantRoutes);
app.use("/owner", invoiceRoutes); 
app.use("/tenant", paymentRoutes);
app.use("/tenant", invoiceRoutes);
app.use("/user", notificationRoutes);



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
