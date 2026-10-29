const pool = require('../data/db');
const AppError = require('../utils/AppError');

const {
    getUserOrdersQuery,
    getProductByIdForUpdate,
    decreaseProductStock,
    insertOrder,
    insertOrderItem
} = require('../queries/orders.queries');

async function getUserOrders(userId) {
    const result = await getUserOrdersQuery(userId);

    const ordersMap = new Map();

    for (const row of result.rows) {
        if (!ordersMap.has(row.order_id)) {
            ordersMap.set(row.order_id, {
                id: row.order_id,
                total: Number(row.total),
                createdAt: row.created_at,
                items: []
            });
        }

        if (row.product_id !== null) {
            ordersMap.get(row.order_id).items.push({
                productId: row.product_id,
                name: row.product_name,
                quantity: row.quantity,
                price: Number(row.price)
            });
        }
    }

    return Array.from(ordersMap.values());
}

async function createOrder(userId, items) {
    if (!Array.isArray(items) || items.length === 0) {
        throw new AppError(
            400,
            'Order must contain at least one item'
        );
    }

    const seenProductIds = new Set();

    for (const item of items) {
        if (
            !item ||
            !Number.isInteger(item.productId) ||
            item.productId <= 0 ||
            !Number.isInteger(item.quantity) ||
            item.quantity <= 0
        ) {
            throw new AppError(400, 'Invalid Order Items');
        }

        if (seenProductIds.has(item.productId)) {
            throw new AppError(
                400,
                'Duplicate Product IDs are Not Allowed'
            );
        }

        seenProductIds.add(item.productId);
    }

    const client = await pool.connect();
    let transactionStarted = false;

    try {
        await client.query('BEGIN');
        transactionStarted = true;

        const orderItems = [];
        let total = 0;

        for (const item of items) {
            const productResult = await getProductByIdForUpdate(
                client,
                item.productId
            );

            if (productResult.rows.length === 0) {
                throw new AppError(
                    404,
                    `Product ${item.productId} Not Found`
                );
            }

            const product = productResult.rows[0];

            if (product.stock < item.quantity) {
                throw new AppError(
                    400,
                    `Insufficient Stock for ${product.name}`
                );
            }

            const price = Number(product.price);

            total += price * item.quantity;

            orderItems.push({
                productId: product.id,
                name: product.name,
                quantity: item.quantity,
                price
            });

            await decreaseProductStock(
                client,
                item.quantity,
                product.id
            );
        }

        total = Number(total.toFixed(2));

        const orderResult = await insertOrder(
            client,
            userId,
            total
        );

        const order = orderResult.rows[0];

        for (const item of orderItems) {
            await insertOrderItem(
                client,
                order.id,
                item.productId,
                item.quantity,
                item.price
            );
        }

        await client.query('COMMIT');
        transactionStarted = false;

        return {
            id: order.id,
            userId: order.user_id,
            items: orderItems,
            total: Number(order.total),
            createdAt: order.created_at
        };
    } catch (error) {
        if (transactionStarted) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackError) {
                console.error(
                    'Transaction rollback failed:',
                    rollbackError
                );
            }
        }

        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    getUserOrders,
    createOrder
};