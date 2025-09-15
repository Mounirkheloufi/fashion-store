const express = require("express");
const { createOrderHandler, getMyOrders, getOrderItemsHandler, updateOrderStatusHandler } = require("../controllers/orderController");
const authMiddleware = require("../middelwares/authMiddleware");
const isAdmin = require("../middelwares/isAdmin");

const router = express.Router();

router.post("/", authMiddleware, createOrderHandler);
router.get("/", authMiddleware, getMyOrders);
router.get("/:id/items", authMiddleware, getOrderItemsHandler);
router.put("/:id/status", authMiddleware, isAdmin, updateOrderStatusHandler);

module.exports = router;