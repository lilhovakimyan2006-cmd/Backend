const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

if (!SECRET) {
    throw new Error('SECRET is Not Defined');
}

function authenticate(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({
            error: 'No Token Provided'
        });
    }

    const token = header.split(" ")[1];

    if (!token || header.split(" ")[0] !== "Bearer") {
        return res.status(401).json({
            error: "Unauthorized"
        })
    }

    try {
        req.user = jwt.verify(token, SECRET);
        
        next();
    } catch (error) {
        res.status(401).json({
            error: 'Invalid or Expired Token'
        });
    }
}

function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Forbidden'
            })
        }

        next();
    }
}

module.exports = {
    authenticate,
    authorize
}