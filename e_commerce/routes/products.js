const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const {
    authenticate,
    authorize
} = require('../middleware/auth');

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post(
    '/',
    authenticate,
    authorize('admin'),
    createProduct
);

router.put(
    '/:id',
    authenticate,
    authorize('admin'),
    updateProduct
);

router.delete(
    '/:id',
    authenticate,
    authorize('admin'),
    deleteProduct
);

module.exports = router;