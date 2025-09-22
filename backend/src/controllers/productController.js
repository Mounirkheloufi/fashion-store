const Product = require("../models/productModel.js");

async function listProducts(req, res, next) {
    try {
        const products = await Product.getAllProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
}

async function getProduct(req, res, next) {
    try {
        const product = await Product.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
}

async function listFeaturedProducts(req, res, next) {
    try {
        const products = await Product.getFeaturedProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
}

async function createProduct(req, res, next) {
    try {
        const { name, description, price, image, stock, category, score } = req.body;
        const { id } = await Product.createProduct({ name, description, price, image, stock, category, score });
        res.status(201).json({ id, name, description, price, image, stock, category, score });
    } catch (error) {
        next(error);
    }
}

async function updateProduct(req, res, next) {
    try {
        const { id } = req.params;
        await Product.updateProduct(id, req.body);
        res.json({ message: "Product updated successfully" });
    } catch (error) {
        next(error);
    }
}

async function removeProduct(req, res, next) {
    try {
        const { id } = req.params;
        await Product.deleteProduct(id, req.body);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
}
module.exports = {
    listProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct,
    listFeaturedProducts
};