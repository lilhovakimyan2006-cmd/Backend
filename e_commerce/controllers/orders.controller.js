const {
    getUserOrders: getUserOrdersService,
    createOrder: createOrderService
} = require('../services/orders.service');

async function getUserOrders(req, res, next) {
    try {
        const orders = await getUserOrdersService(req.user.id);

        return res.status(200).json(orders);
    } catch (error) {
        return next(error);
    }
}

async function createOrder(req, res, next) {
    try {
        const order = await createOrderService(
            req.user.id,
            req.body.items
        );

        return res.status(201).json(order);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getUserOrders,
    createOrder
};