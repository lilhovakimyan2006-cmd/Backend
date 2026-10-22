const express = require("express");

const { readData, writeData } = require("../utils/fileDB");

const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get('/page', authenticate, async (req, res) => {
    const orders = await readData('orders.json');
    const userOrders = orders.filter((order) => order.userId === req.user.id);
    res.render('orders', { orders: userOrders });
});

//POST /orders - body : {item: [productId, quantity]}
router.post('/', authenticate, async (req, res) => {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            error: 'Items must be a non-empty array'
        });
    }

    const products = await readData('products.json');

    let total = 0;
    const orderItems = [];

    const productIds = items.map((item) => item?.productId);

    if (new Set(productIds).size !== productIds.length) {
        return res.status(400).json({
            error: 'Duplicate Products Are Not Allowed'
        });
    }

    for (const item of items) {
        if (!item ||
            !Number.isInteger(item.productId) ||
            item.productId <= 0
        ) {
            return res.status(400).json({
                error: 'Invalid Product ID'
            });
        }

        const product = products.find((p) => p.id === item.productId);

        if (!product) {
            return res.status(400).json({
                error: `Product ${item.productId} Not Found`
            });
        }

        if (typeof item.quantity !== 'number' ||
            item.quantity <= 0 ||
            !Number.isInteger(item.quantity)
            ) {
                return res.status(400).json({
                    error: 'Quantity Must Be a Positive Integer'
                });
            }

        if (product.stock < item.quantity) {
            return res.status(400).json({
                error: 'Not Enough Stock for Product'
            });
        }

        total += product.price * item.quantity;
        orderItems.push({
            productId: product.id,
            name: product.name,
            quantity: item.quantity,
            price: product.price,
        });
    }

    items.forEach((item) => {
        const p = products.find((p) => p.id === item.productId);
        p.stock -= item.quantity;
    });

    await writeData('products.json', products);

    const orders = await readData('orders.json');

    const newOrder = {
        id: orders.length 
                    ? Math.max(...orders.map((p) => p.id)) + 1
                    : 1,
        userId: req.user.id,
        items: orderItems,
        total,  
        createdAt: new Date().toISOString()
    };

    orders.push(newOrder);

    await writeData('orders.json', orders);

    res.status(201).json(newOrder);
});

module.exports = router;