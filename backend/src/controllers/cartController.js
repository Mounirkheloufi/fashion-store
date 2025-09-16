const Cart = require('../models/cartModel');

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
module.exports = {
    getCartHandler,
    addToCartHandler,
    addManyToCartHandler,
    updateCartItemHandler,
    deleteCartItemHandler,
    clearCartHandler
};