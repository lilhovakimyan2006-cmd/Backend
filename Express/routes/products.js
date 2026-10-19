const express = require("express");

const router = express.Router();

let productId = 1;
const products = [];

router.get("/", (req, res) => {
    res.json(products);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) ||
        id < 1
    ) {
        return res.status(400).json({
            message: "Invalid product ID"
        });
    }

    const product = products.find((item) => item.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Not Found"
        });
    }

    res.json(product);
});

router.post("/", (req, res) => {
    if (typeof req.body.name !== "string" ||
        !req.body.name.trim() ||
        typeof req.body.price !== "number" ||
        !Number.isFinite(req.body.price) ||
        req.body.price < 0
    ) {
        return res.status(400).json({
            message: "Bad Request"
        });
    }

    const product = {
        id: productId++,
        name: req.body.name.trim(),
        price: req.body.price
    };

    products.push(product);

    res.status(201).json(product);
});

module.exports = router;