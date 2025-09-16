const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

const errorMiddleware = require("./middelwares/errorMiddleware");
const authMiddleware = require("./middelwares/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware global
app.use(cors());
app.use(express.json());

// generate pdf facture
app.use('/invoices', express.static('invoices'));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Error handler
app.use(authMiddleware)
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
