const express = require("express");

const { readData, writeData } = require("../utils/fileDB");

const { authenticate, authorize } = require("../middleware/auth")
const router = express.Router();

router.get("/page", async (req, res) => {
    const products = await readData('products.json');
    res.render('products', { products });
});

//GET /products?category=electronics&sort=price
router.get("/", async (req, res) => {
    let products = await readData('products.json');

    const { category, sort } = req.query;

    if(category) {
        products = products.filter((p) => p.category === category);
    }

    if (sort === 'price') {
        products = products.sort((a, b) => a.price - b.price);
    }

    res.json(products);
});

router.get("/:id", async (req, res) => {
    const products = await readData('products.json');

    const productID = Number(req.params.id);

    const product = products.find((p) => p.id === productID);

    if (!product) {
        return res.status(404).json({
            error: 'Product Not Found'
        });
    }

    res.json(product);
});

router.post("/", 
    authenticate, 
    authorize("admin"), 
    async (req, res, next) => {
        try {
            const { name, price, category, stock } = req.body;
    
            if (typeof name !== 'string' ||
                !name.trim() ||
                typeof price !== 'number' ||
                !Number.isFinite(price) ||
                price < 0 ||
                (category !== undefined &&
                    (typeof category !== 'string' || !category.trim())) ||
                (stock !== undefined &&
                    (!Number.isInteger(stock) || stock < 0))
            ) {
                return res.status(400).json({
                    error: 'Invalid Product Name or Price'
                });
            }
    
            const products = await readData('products.json');
    
            const newProduct = {
                id: products.length 
                    ? Math.max(...products.map((p) => p.id)) + 1
                    : 1,
                name: name.trim(), 
                price: price,
                category: category || 'other',
                stock: stock ?? 0,
            }
    
            products.push(newProduct);
            await writeData('products.json', products);
    
            res.status(201).json(newProduct);

        } catch (error) {

            next(error);

        }
});

router.put("/:id", authenticate, authorize('admin'), async (req, res, next) => {
    try {
        const { name, price, category, stock } = req.body;

        if (typeof name !== 'string' ||
            !name.trim() ||
            typeof price !== 'number' ||
            !Number.isFinite(price) ||
            price < 0 ||
            typeof category !== 'string' ||
            !category.trim() ||
            !Number.isInteger(stock) ||
            stock < 0
        ) {
            return res.status(400).json({
                error: 'Invalid Product Data'
            })
        }

        const products = await readData('products.json');

        const productID = Number(req.params.id);

        const index = products.findIndex((p) => p.id === productID);

        if (index === -1) {
            return res.status(404).json({
                error: 'Product Not Found'
            });
        }

        const newProduct = {
            id: products[index].id,
            name: name.trim(),
            price,
            category: category.trim(),
            stock
        };

        products[index] = newProduct;

        await writeData('products.json', products);

        res.status(200).json(newProduct);
    } catch (error) {
        
        next(error);

    }
});

router.delete("/:id", authenticate, authorize('admin'), async (req, res, next) => {
    try {
        let products = await readData('products.json');
    
        const exists = products.some((p) => p.id === Number(req.params.id));
    
        if (!exists) {
            return res.status(404).json({
                error: 'Product Not Found'
            });
        }
    
        products = products.filter((p) => p.id !== Number(req.params.id));
    
        await writeData('products.json', products);
    
        res.status(204).end();
    } catch(error) {

        next(error);

    }
});

module.exports = router;