const express = require("express");
const {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
} = require("../controllers/productController");

const router = express.Router();

/**
 * @swagger
 * tags:
 * - name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *   summary: Get all products
 *   tags: [Products]
 *   responses:
 *    200:
 *      description: List of products
 */
router.get("/", listProducts);
/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *   summary: Get a product by ID
 *   tags: [Products]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Product data
 */
router.get("/:id", getProduct);
/**
 * @swagger
 * /api/products:
 *  post:
 *   summary: Create a new product
 *   tags: [Products]
 *   requestBody:
 *    required: true
 *   content:
 *    application/json:
 *     schema:
 *      type: object
 *      properties:
 *       name:
 *        type: string
 *       description:
 *        type: string
 *       price:
 *        type: number
 *       image: 
 *        type: string
 *       stock:
 *        type: integer
 *       category:
 *        type: string
 *       score:
 *        type: number
 *        example: 4.5 
 *   responses:
 *    201:
 *     description: Product created successfully
 */
router.post("/", createProduct);
/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *   summary: Update product
 *   tags: [Products]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Product updated successfully
 */
router.put("/:id", updateProduct);
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *   summary: Delete a product
 *   tags: [Products]
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *      description: Product deleted successfully
 */
router.delete("/:id", removeProduct);

module.exports = router;