const express = require("express");

const router = express.Router();

let userId = 1;
const users = [];

router.get("/", (req, res) => {
    res.json(users);
});

router.post("/", (req, res) => {
    if (typeof req.body.name !== "string" ||
        !req.body.name.trim() ||
        typeof req.body.age !== "number" ||
        !Number.isFinite(req.body.age) ||
        req.body.age < 0
    ) {
        return res.status(400).json({
            message: "Bad Request"
        });
    }

    const user = {
        id: userId++,
        name: req.body.name.trim(),
        age: req.body.age,
    };

    users.push(user);

    res.status(201).json(user);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            message: "Invalid user ID"
        });
    }

    const user = users.find((value) => value.id === id);

    if (!user) {
        return res.status(404).json({
            message: "Not Found"
        });
    }

    res.json(user);
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) ||
        id < 1
    ) {
        return res.status(400).json({
            message: "Invalid user ID"
        });
    }

    const user = users.find((value) => value.id === id);

    if (!user) {
        return res.status(404).json({
            message: "Not Found"
        });
    }

    const updatedData = {
        name: req.body.name.trim(),
        age: req.body.age,
    }

    if (typeof updatedData.name !== "string" || 
        !updatedData.name.trim() ||
        typeof updatedData.age !== "number" ||
        !Number.isFinite(updatedData.age) ||
        updatedData.age < 0
    ) {
        return res.status(400).json({
            message: "Bad Request"
        });
    }

    user.name = updatedData.name;
    user.age = updatedData.age;

    res.status(200).json(user);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            message: "Invalid user ID"
        });
    }

    const index = users.findIndex((value) => value.id === id);
    
    if (index === -1) {
        return res.status(404).json({
            message: "User does not exist"
        });
    }

    users.splice(index, 1);

    res.status(200).json({
        message: "User deleted successfully"
    });
});

module.exports = router;