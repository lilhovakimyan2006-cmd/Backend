const AppError = require('../utils/AppError');

const {
    getAllProductsQuery,
    getProductByIdQuery,
    createProductQuery,
    updateProductQuery,
    deleteProductQuery
} = require('../queries/products.queries');

async function getProducts() {
    const result = await getAllProductsQuery();

    return result.rows;
}

async function getProductById(productId) {
    if (!Number.isInteger(productId) || productId <= 0) {
        throw new AppError(400, 'Invalid Product ID');
    }

    const result = await getProductByIdQuery(productId);

    if (result.rows.length === 0) {
        throw new AppError(404, 'Product Not Found');
    }

    return result.rows[0];
}

async function createProduct({ name, price, category, stock }) {
    validateProduct({ name, price, category, stock });

    const result = await createProductQuery(
        name.trim(),
        price,
        category.trim(),
        stock
    );

    return result.rows[0];
}

async function updateProduct(
    productId,
    { name, price, category, stock }
) {
    if (!Number.isInteger(productId) || productId <= 0) {
        throw new AppError(400, 'Invalid Product ID');
    }

    validateProduct({ name, price, category, stock });

    const result = await updateProductQuery(
        productId,
        name.trim(),
        price,
        category.trim(),
        stock
    );

    if (result.rows.length === 0) {
        throw new AppError(404, 'Product Not Found');
    }

    return result.rows[0];
}

async function deleteProduct(productId) {
    if (!Number.isInteger(productId) || productId <= 0) {
        throw new AppError(400, 'Invalid Product ID');
    }

    const result = await deleteProductQuery(productId);

    if (result.rows.length === 0) {
        throw new AppError(404, 'Product Not Found');
    }
}

function validateProduct({ name, price, category, stock }) {
    if (
        typeof name !== 'string' ||
        !name.trim() ||
        typeof price !== 'number' ||
        !Number.isFinite(price) ||
        price < 0 ||
        typeof category !== 'string' ||
        !category.trim() ||
        !Number.isInteger(stock) ||
        stock < 0
    ) {
        throw new AppError(400, 'Invalid Product Data');
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};