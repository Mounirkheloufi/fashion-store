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

module.exports = {
    createOrderHandler,
    getMyOrders
};