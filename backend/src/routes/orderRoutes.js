const express = require("express");
const { createOrderHandler, getMyOrders, getOrderItemsHandler, updateOrderStatusHandler, getOrderByIdHandler } = require("../controllers/orderController");
const authMiddleware = require("../middelwares/authMiddleware");
const isAdmin = require("../middelwares/isAdmin");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Order management
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: 64a1f2b3c9d1f4e6a7b8c9d0
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/", authMiddleware, createOrderHandler);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get my orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get("/", authMiddleware, getMyOrders);

/**
 * @swagger
 * /api/orders/{id}/items:
 *   get:
 *     summary: Get order items by order ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 */
router.get("/:id/items", authMiddleware, getOrderItemsHandler);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *                 example: shipped
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
router.put("/:id/status", authMiddleware, isAdmin, updateOrderStatusHandler);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 */
router.get("/:id", authMiddleware, getOrderByIdHandler);

module.exports = router;