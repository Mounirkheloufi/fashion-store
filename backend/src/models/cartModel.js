const pool = require("../config/db");

async function findOrCreateCart(userId) {
    const [rows] = await pool.query("SELECT * FROM carts WHERE user_id = ?", [userId]);
    if (rows.length > 0) return rows[0];

    const [result] = await pool.query("INSERT INTO carts (user_id) VALUES (?)", [userId]);
    return { id: result.insertId, user_id: userId };
}

async function getCartItems(cartId) {
    const [rows] = await pool.query(
        "SELECT ci.id, ci.product_id, p.name, p.image, p.price, ci.quantity FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = ?",
        [cartId]
    );
    return rows;
}

async function addItem(cartId, productId, quantity) {
    const [rows] = await pool.query(
        "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?",
        [cartId, productId]
    );
    if (rows.length > 0) {
        await pool.query(
            "UPDATE cart_items SET quantity = quantity + ? WHERE id = ?",
            [quantity, rows[0].id]
        );
        return { ...rows[0], quantity: rows[0].quantity + quantity };
    }

    const [result] = await pool.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
        [cartId, productId, quantity]
    );
    return { id: result.insertId, cart_id: cartId, product_id: productId, quantity };
}

async function updateItem(itemId, quantity) {
    await pool.query(
        "UPDATE cart_items SET quantity = ? WHERE id = ?",
        [quantity, itemId]
    );
}

async function deleteItem(itemId) {
    await pool.query("DELETE FROM cart_items WHERE id = ?", [itemId]);
}

async function clearCart(cartId) {
    await pool.query("DELETE FROM cart_items WHERE cart_id = ?", [cartId]);
}
module.exports = {
    findOrCreateCart,
    getCartItems,
    addItem,
    updateItem,
    deleteItem,
    clearCart
};