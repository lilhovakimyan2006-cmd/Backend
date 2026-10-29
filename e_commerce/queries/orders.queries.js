const pool = require('../data/db');

async function getUserOrdersQuery(userId) {
    return pool.query(
        `SELECT
            o.id AS order_id,
            o.total,
            o.created_at,
            oi.product_id,
            oi.quantity,
            oi.price,
            p.name AS product_name
         FROM orders o
         LEFT JOIN order_items oi
            ON oi.order_id = o.id
         LEFT JOIN products p
            ON p.id = oi.product_id
         WHERE o.user_id = $1
         ORDER BY o.created_at DESC, o.id DESC`,
        [userId]
    );
}

async function getProductByIdForUpdate(client, productId) {
    return client.query(
        `SELECT id, name, price, stock
         FROM products
         WHERE id = $1
         FOR UPDATE`,
        [productId]
    );
}

async function decreaseProductStock(client, quantity, productId) {
    return client.query(
        `UPDATE products
         SET stock = stock - $1
         WHERE id = $2`,
        [quantity, productId]
    );
}

async function insertOrder(client, userId, total) {
    return client.query(
        `INSERT INTO orders (user_id, total)
         VALUES ($1, $2)
         RETURNING id, user_id, total, created_at`,
        [userId, total]
    );
}

async function insertOrderItem(
    client,
    orderId,
    productId,
    quantity,
    price
) {
    return client.query(
        `INSERT INTO order_items
            (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, productId, quantity, price]
    );
}

module.exports = {
    getUserOrdersQuery,
    getProductByIdForUpdate,
    decreaseProductStock,
    insertOrder,
    insertOrderItem
};