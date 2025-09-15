const pool = require("../config/db");

async function createOrder(useriId, total, items) {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const [orderResult] = await conn.query(
            "INSERT INTO orders (user_id, total) VALUES (?, ?)",
            [useriId, total]
        );
        const orderId = orderResult.insertId;

        const orderItemsPromises = items.map(item => {
            return conn.query(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                [orderId, item.productId, item.quantity, item.price]
            );
        });
        await Promise.all(orderItemsPromises);
        await conn.commit();
        return { id: orderId };
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}

async function getOrdersByUserId(userId) {
    const [orders] = await pool.query("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC", [userId]);
    return orders;
}

module.exports = {
    createOrder,
    getOrdersByUserId
};