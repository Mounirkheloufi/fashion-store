const Order = require("../models/orderModel.js");
const db = require("../config/db");

async function createOrderHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const { items } = req.body; 
    // items = [{ productId, quantity }, ...]

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Order must contain at least one item" });
    }

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const [productRows] = await db.query(
        "SELECT price, stock FROM products WHERE id = ?",
        [item.productId]
      );

      if (productRows.length === 0) {
        return res.status(404).json({ error: `Product ${item.productId} not found` });
      }

      const product = productRows[0];

      // Vérifier le stock
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for product ${item.productId}` });
      }

      // Calcul du prix total de l'item
      const itemPrice = parseFloat(product.price);
      const itemTotal = itemPrice * item.quantity;

      total += itemTotal;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: itemPrice, // prix unitaire du produit au moment de l'achat
      });

      // ⚠️ Mettre à jour le stock du produit
      await db.query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.productId]
      );
    }

    // Créer la commande
    const [orderResult] = await db.query(
      "INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)",
      [userId, total.toFixed(2), "pending"]
    );

    const orderId = orderResult.insertId;

    // Insérer les order_items
    for (const item of orderItems) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.productId, item.quantity, item.price]
      );
    }

    res.status(201).json({
      message: "Order created successfully",
      orderId,
      total: total.toFixed(2),
    });
  } catch (error) {
    next(error);
  }
}


async function getMyOrders(req, res, next) {
    try {
        const userId = req.user.id;
        const orders = await Order.getOrdersByUserId(userId);
        res.json(orders);
    } catch (error) {
        next(error);
    }   
}

async function getOrderItemsHandler(req, res, next) {
    try {
        const orderId = req.params.id;
        const items = await Order.getOrderItems(orderId);
        res.json(items);
    } catch (error) {
        next(error);
    }
}

async function updateOrderStatusHandler(req, res, next) {
    try {
        const { status } = req.body;
        const orderId = req.params.id;
        const updated = await Order.updateOrderStatus(orderId, status);
        res.json(updated);
    } catch (error) {
        next(error);
    }
}

async function getOrderByIdHandler(req, res, next) {
  try {
    const orderId = req.params.id;
    const order = await Order.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    
    if (order.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
}

module.exports = {
    createOrderHandler,
    getMyOrders,
    getOrderItemsHandler,
    updateOrderStatusHandler,
    getOrderByIdHandler
};