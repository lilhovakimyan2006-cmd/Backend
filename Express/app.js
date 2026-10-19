require("dotenv").config();

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const express = require("express");

const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const logger = require("./middleware/logger");
const authRouter = require("./routes/auth");
const authenticate = require("./middleware/authenticate");
const authorize = require("./middleware/authorize");

const app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/auth", authRouter);

app.get("/profile", authenticate, (req, res) => {
    res.json({
        message: "Your profile",
        user: req.user
    });
});

app.get("/admin", authenticate, authorize("admin"), (req, res) => {
    res.json({
        message: "Welcome, admin!"
    });
});

app.get("/headers", (req, res) => {
    res.json(req.headers);
});

app.get("/search", (req, res) => {
    const { term, limit } = req.query;
    res.send(`Searching "${term}", limit "${limit}"`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: "Internal Server Error"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});