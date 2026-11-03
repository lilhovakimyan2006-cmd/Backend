const AppError = require('../utils/AppError');
const AUTH_ERRORS = require('../constants/errors/auth.errors');

const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(
                new AppError(
                    AUTH_ERRORS.UNAUTHORIZED.message,
                    AUTH_ERRORS.UNAUTHORIZED.statusCode
                )
            );
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(
                new AppError(
                    AUTH_ERRORS.FORBIDDEN.message,
                    AUTH_ERRORS.FORBIDDEN.statusCode
                )
            );
        }

        next();
    };
};

module.exports = authorize;