const Order = require("../models/orderModel.js");

async function createOrderHandler(req, res, next) {
    try {
        const userId = req.user.id;
        const { total, items } = req.body;
        // items = [{ productId, quantity, price }, ...]
        const result = await Order.createOrder(userId, total, items);
        res.status(201).json({ orderId: result.id });
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

module.exports = {
    createOrderHandler,
    getMyOrders,
    getOrderItemsHandler,
    updateOrderStatusHandler
};