const Product = require("../models/productModel");
const User = require("../models/userModel");
const orders = require("../models/orderModel");
const db = require('../config/db');

const getAdminStats = async (req, res) => {
    try {
        const [productsResult] = await db.query("SELECT COUNT(*) AS count FROM products");
        const products = productsResult[0].count;

        const [usersResult] = await db.query("SELECT COUNT(*) AS count FROM users");
        const users = usersResult[0].count;

        const [ordersResult] = await db.query("SELECT COUNT(*) AS count FROM orders");
        const orders = ordersResult[0].count;

        const [revenueResult] = await db.query("SELECT IFNULL(SUM(total),0) AS revenue FROM orders WHERE status = 'pending'");
        const revenue = revenueResult[0].revenue;

        const [ordersByMonth] = await db.query(`
          SELECT MONTH(created_at) AS month, COUNT(*) AS orders
          FROM orders
          GROUP BY MONTH(created_at)
          ORDER BY month ASC
        `);

        const [revenueByMonth] = await db.query(`
          SELECT MONTH(created_at) AS month, IFNULL(SUM(total),0) AS revenue
          FROM orders
          WHERE status = 'pending'
          GROUP BY MONTH(created_at)
          ORDER BY month ASC
        `);

        res.json({
          products,
          users,
          orders,
          revenue,
          ordersByMonth,
          revenueByMonth,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

const banUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si l'utilisateur existe
    const [user] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (!user.length) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle entre actif et inactif
    const newStatus = user[0].is_active ? 0 : 1;
    await db.query("UPDATE users SET is_active = ? WHERE id = ?", [newStatus, id]);

    res.json({
      message: newStatus ? "User activated successfully" : "User deactivated (banned) successfully",
      userId: id,
      is_active: newStatus
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

module.exports = { 
    getAdminStats,
    banUser
 };