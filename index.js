require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json()); // Enable JSON parsing



// Import user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);  // ✅ Ensure this is correctly written

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
