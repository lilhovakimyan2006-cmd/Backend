const express = require('express');
const router = express.Router();

const {
    getUserOrders,
    createOrder
} = require('../controllers/orderController');

const { authenticate } = require('../middleware/auth');

router.get('/page', authenticate, getUserOrders);
router.post('/', authenticate, createOrder);

module.exports = router;