const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const { generateInvoice } = require('../utils/pdfGenerator');
const db = require('../config/db');

async function getCartHandler(req, res, next) {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOrCreateCart(userId);
        const items = await Cart.getCartItems(cart.id);

        res.json({ cart, items });
    } catch (error) {
        next(error);
    }
}

async function addToCartHandler(req, res, next) {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const cart = await Cart.findOrCreateCart(userId);
        const item = await Cart.addItem(cart.id, productId, quantity);

        res.status(201).json(item);
    } catch (error) {
        next(error);
    }
}

async function addManyToCartHandler(req, res, next) {
    try {
        const userId = req.user.id;
        const { items } = req.body; 
        // items = [{ productId, quantity }, {productId, quantity}, ...]

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({error: "Items attay required"});
        }

        const cart = await Cart.findOrCreateCart(userId);

        const results = [];
        for (const item of items) {
            const added = await Cart.addItem(cart.id, item.productId, item.quantity);
            results.push(added);
        }
        res.status(201).json({message: "products added", items: results});
    } catch (error) {
        next(error);
    }
}

async function updateCartItemHandler(req, res, next) {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        await Cart.updateItem(id, quantity);
        res.json({ message: 'Item updated successfully' });
    } catch (error) {
        next(error);
    }
}

async function deleteCartItemHandler(req, res, next) {
    try {
        const { id } = req.params;
        await Cart.deleteItem(id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        next(error);
    }
}

async function clearCartHandler(req, res, next) {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOrCreateCart(userId);

        await Cart.clearCart(cart.id);
        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        next(error);
    }
}

async function checkoutHandler(req, res, next) {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOrCreateCart(userId);
    const items = await Cart.getCartItems(cart.id);

    if(!items || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const itemPrice = parseFloat(item.price);
      const itemTotal = itemPrice * item.quantity;
      total += itemTotal;

      orderItems.push({
        productId: item.product_id,
        name: item.name,  // on garde le nom pour la facture
        quantity: item.quantity,
        price: itemPrice
      });

      const [productRows] = await db.query(
        "SELECT stock FROM products WHERE id = ?",
        [item.product_id]
      );

      if(productRows.length === 0 || productRows[0].stock < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for product ${item.product_id}` });
      }

      await db.query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.product_id]
      );
    }

    const [orderResult] = await db.query(
      "INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)",
      [userId, total.toFixed(2), "pending"]
    );

    const orderId = orderResult.insertId;

    for (const item of orderItems) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.productId, item.quantity, item.price]
      );
    }

    await Cart.clearCart(cart.id);

    // Générer la facture PDF
    const orderData = {
      id: orderId,
      email: req.user.email, // ou req.user.email
      created_at: new Date(),
      total,
      items: orderItems
    };

    const pdfPath = await generateInvoice(orderData);

    res.status(201).json({
      message: "Checkout successful. Order created.",
      orderId,
      total: total.toFixed(2),
      invoice: `/invoices/invoice_${orderId}.pdf`
    });

  } catch (error) {
    next(error);
  }
}

module.exports = {
    getCartHandler,
    addToCartHandler,
    addManyToCartHandler,
    updateCartItemHandler,
    deleteCartItemHandler,
    clearCartHandler,
    checkoutHandler
};