const { verifyToken } = require('../utils/jwt');
const { User } = require('../models');
const AppError = require('../utils/AppError');
const AUTH_ERRORS = require('../constants/errors/auth.errors');

const createAuthError = (error) => {
    return new AppError(error.message, error.statusCode);
};

const handleTokenError = (error) => {
    if (error.name === 'TokenExpiredError') {
        return createAuthError(AUTH_ERRORS.TOKEN_EXPIRED);
    }

    if (error.name === 'JsonWebTokenError') {
        return createAuthError(AUTH_ERRORS.TOKEN_INVALID);
    }

    return error;
};

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw createAuthError(AUTH_ERRORS.TOKEN_MISSING);
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw createAuthError(AUTH_ERRORS.TOKEN_MISSING);
        }

        let decoded;

        try {
            decoded = verifyToken(token);
        } catch (error) {
            throw handleTokenError(error);
        }

        const user = await User.findByPk(decoded.id);

        if (!user) {
            throw createAuthError(AUTH_ERRORS.UNAUTHORIZED);
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

const optionalAuthenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next();
        }

        if (!authHeader.startsWith('Bearer ')) {
            throw createAuthError(AUTH_ERRORS.TOKEN_INVALID);
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw createAuthError(AUTH_ERRORS.TOKEN_MISSING);
        }

        let decoded;

        try {
            decoded = verifyToken(token);
        } catch (error) {
            throw handleTokenError(error);
        }

        const user = await User.findByPk(decoded.id);

        if (!user) {
            throw createAuthError(AUTH_ERRORS.UNAUTHORIZED);
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    authenticate,
    optionalAuthenticate
};