const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const users = [];

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (typeof username !== "string" ||
            !username.trim() ||
            typeof password !== "string" ||
            password.length < 6
        ) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const existingUser = users.find(
            (user) => user.username === username
        );

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            id: users.length + 1,
            username,
            password: hashedPassword,
            role: "user"
        };

        users.push(user);

        res.status(201).json({
            message: "User registered successfully"
        });
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (typeof username !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const user = users.find(
            (user) => user.username === username
        );

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (error) {
        next(error);
    }
});

module.exports = router;