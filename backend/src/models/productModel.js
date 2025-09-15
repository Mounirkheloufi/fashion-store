const pool = require("../config/db");

async function getAllProducts() {
    const [rows] = await pool.query("SELECT * FROM products Order BY created_at DESC");
    return rows;
}

async function getProductById(id) {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
}

async function createProduct({ name, description, price, image, stock= 0, category= null }) {
    const [result] = await pool.query(
        "INSERT INTO products (name, description, price, image, stock, category) VALUES (?, ?, ?, ?, ?, ?)",
        [name, description, price, image, stock, category]
    );
    return { id: result.insertId };
}

async function updateProduct(id, { name, description, price, image, stock, category }) {
    const [result] = await pool.query(
        "UPDATE products SET name = ?, description = ?, price = ?, image = ?, stock = ?, category = ? WHERE id = ?",
        [name, description, price, image, stock, category, id]
    );
}

async function deleteProduct(id) {
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};