const express = require("express");
const {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
} = require("../controllers/productController");

const router = express.Router();

// Route to fetch all products
router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", removeProduct);

module.exports = router;