const express = require("express");
const { getCartHandler, addToCartHandler, addManyToCartHandler, updateCartItemHandler, deleteCartItemHandler, clearCartHandler } = require("../controllers/cartController");
const authMiddleware = require("../middelwares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getCartHandler);
router.post("/items", authMiddleware, addToCartHandler);
router.put("/items/:id", authMiddleware, updateCartItemHandler);
router.delete("/items/:id", authMiddleware, deleteCartItemHandler);
router.delete("/", authMiddleware, clearCartHandler);
router.post("/items/bulk", authMiddleware, addManyToCartHandler);

module.exports = router;