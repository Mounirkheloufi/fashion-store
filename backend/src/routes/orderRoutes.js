const express = require("express");
const { createOrderHandler, getMyOrders } = require("../controllers/orderController");
const authMiddleware = require("../middelwares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createOrderHandler);
router.get("/", authMiddleware, getMyOrders);

module.exports = router;