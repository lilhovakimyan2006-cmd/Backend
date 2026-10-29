const {
    getProducts: getProductsService,
    getProductById: getProductByIdService,
    createProduct: createProductService,
    updateProduct: updateProductService,
    deleteProduct: deleteProductService
} = require('../services/products.service');

async function getProducts(req, res, next) {
    try {
        const products = await getProductsService();

        return res.status(200).json(products);
    } catch (error) {
        return next(error);
    }
}

async function getProductById(req, res, next) {
    try {
        const productID = Number(req.params.id);

        const product = await getProductByIdService(productID);

        return res.status(200).json(product);
    } catch (error) {
        return next(error);
    }
}

async function createProduct(req, res, next) {
    try {
        const product = await createProductService(req.body);

        return res.status(201).json(product);
    } catch (error) {
        return next(error);
    }
}

async function updateProduct(req, res, next) {
    try {
        const productID = Number(req.params.id);

        const product = await updateProductService(
            productID,
            req.body
        );

        return res.status(200).json(product);
    } catch (error) {
        return next(error);
    }
}

async function deleteProduct(req, res, next) {
    try {
        const productID = Number(req.params.id);

        await deleteProductService(productID);

        return res.status(204).send();
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};