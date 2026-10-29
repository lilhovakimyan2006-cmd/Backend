const pool = require('../data/db');

async function getAllProductsQuery() {
    return pool.query(
        `SELECT id, name, price, category, stock
         FROM products
         ORDER BY id ASC`
    );
}

async function getProductByIdQuery(productId) {
    return pool.query(
        `SELECT id, name, price, category, stock
         FROM products
         WHERE id = $1`,
        [productId]
    );
}

async function createProductQuery(name, price, category, stock) {
    return pool.query(
        `INSERT INTO products (name, price, category, stock)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, price, category, stock`,
        [name, price, category, stock]
    );
}

async function updateProductQuery(
    productId,
    name,
    price,
    category,
    stock
) {
    return pool.query(
        `UPDATE products
         SET name = $1,
             price = $2,
             category = $3,
             stock = $4
         WHERE id = $5
         RETURNING id, name, price, category, stock`,
        [name, price, category, stock, productId]
    );
}

async function deleteProductQuery(productId) {
    return pool.query(
        `DELETE FROM products
         WHERE id = $1
         RETURNING id`,
        [productId]
    );
}

module.exports = {
    getAllProductsQuery,
    getProductByIdQuery,
    createProductQuery,
    updateProductQuery,
    deleteProductQuery
};