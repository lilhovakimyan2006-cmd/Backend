const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

function authenticate(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            error: 'No Token Provided'
        });
    }

    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token || authorization.split(' ').length !== 2) {
        return res.status(401).json({
            error: 'Invalid Authorization Header'
        });
    }

    try {
        req.user = jwt.verify(token, SECRET);
        return next();
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid or Expired Token'
        });
    }
}

function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: 'Authentication Required'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Forbidden'
            });
        }

        return next();
    };
}

module.exports = {
    authenticate,
    authorize
};