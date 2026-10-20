const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader ||!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Token is missing"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        req.user = user;
        next();
    } catch(error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

function authorizeAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admin only."
        });
    }

    next();
}

module.exports = {
    authenticateToken,
    authorizeAdmin
}