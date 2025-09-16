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

async function getOrderById(orderId) {
  const [orderRows] = await pool.query("SELECT * FROM orders WHERE id = ?", [orderId]);
  if (orderRows.length === 0) return null;

  const [items] = await pool.query(
    `SELECT oi.id, oi.quantity, oi.price, 
            p.id AS product_id, p.name, p.image 
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    [orderId]
  );

  return {
    ...orderRows[0],
    items
  };
}


async function getOrderItems(orderId) {
    const [items] = await pool.query(
        "SELECT oi.id, oi.order_id, oi.product_id, oi.quantity, oi.price, p.name, p.image From order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?",
        [orderId]
    );
    return items;
}

async function updateOrderStatus(orderId, status) {
    await pool.query(
        "UPDATE orders SET status = ? WHERE id = ?",
        [status, orderId]
    );
    return { id: orderId, status };
}


module.exports = {
    createOrder,
    getOrdersByUserId,
    getOrderItems,
    updateOrderStatus,
    getOrderById
};