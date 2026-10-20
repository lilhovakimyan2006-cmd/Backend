const express = require("express");
const router = express.Router();

const { authenticateToken, authorizeAdmin } = require("./../middleware/auth");

let productId = 1;
const products = [];

router.get("/", (req, res) => {
    res.json(products);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }

    const product = products.find((item) => item.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product Does Not Exist"
        });
    }

    res.status(200).json(product);
});

router.post("/", 
    authenticateToken, 
    (req, res) => {
        
    if (typeof req.body.name !== "string" ||
        !req.body.name.trim() ||
        typeof req.body.price !== "number" ||
        !Number.isFinite(req.body.price) ||
        req.body.price < 0  
    ) {
        return res.status(400).json({
            message: "Required fields are missing"
        });
    }
    
    const product = {
        id: productId++,
        name: req.body.name.trim(),
        price: req.body.price
    };

    products.push(product);

    res.status(201).json({
        message: "Created Successfully",
        product
    });
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }

    if (typeof req.body.name !== "string" ||
        !req.body.name.trim() ||
        typeof req.body.price !== "number" ||
        !Number.isFinite(req.body.price) ||
        req.body.price < 0  
    ) {
        return res.status(400).json({
            message: "Required fields are missing"
        });
    }

    const product = products.find((item) => item.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product Does Not Exist"
        });
    }

    product.name = req.body.name.trim();
    product.price = req.body.price;

    res.status(200).json(product);
});

router.delete("/:id", 
    authenticateToken, 
    authorizeAdmin, 
    (req, res) => {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }

    const product = products.find((item) => item.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product Does Not Exist"
        });
    }

    const index = products.indexOf(product);

    products.splice(index, 1);

    res.status(200).json({
        message: "Product deleted successfully",
        product
    });
});

module.exports = router;