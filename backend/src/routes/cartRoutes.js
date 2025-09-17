const express = require("express");
const { getCartHandler, addToCartHandler, addManyToCartHandler, updateCartItemHandler, deleteCartItemHandler, clearCartHandler, checkoutHandler } = require("../controllers/cartController");
const authMiddleware = require("../middelwares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: Shopping cart management
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get my cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authMiddleware, getCartHandler);

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64a1f2b3c9d1f4e6a7b8c9d0
 *               quantity:
 *                 type: integer
 *                 example: 3
 */
router.post("/items", authMiddleware, addToCartHandler);

/**
 * @swagger
 * /api/cart/items/{id}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 5
 */
router.put("/items/:id", authMiddleware, updateCartItemHandler);

/**
 * @swagger
 * /api/cart/items/{id}:
 *   delete:
 *     summary: Delete an item from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 */
router.delete("/items/:id", authMiddleware, deleteCartItemHandler);

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: Clear the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/", authMiddleware, clearCartHandler);

/**
 * @swagger
 * /api/cart/items/bulk:
 *   post:
 *     summary: Add multiple items to the cart
 *     tags: [Cart]
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
 */
router.post("/items/bulk", authMiddleware, addManyToCartHandler);

/**
 * @swagger
 * /api/cart/checkout:
 *   post:
 *     summary: Checkout and create an order
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/checkout", authMiddleware, checkoutHandler);

module.exports = router;