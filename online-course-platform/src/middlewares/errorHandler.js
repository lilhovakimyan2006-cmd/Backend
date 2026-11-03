const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
    let statusCode;
    let message;

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err.name === 'SequelizeValidationError') {
        statusCode = 400;
        message = err.errors.map(error => error.message).join(', ');
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 409;
        message = 'Resource already exists';
    } else if (err.name === 'SequelizeForeignKeyConstraintError') {
        statusCode = 400;
        message = 'Invalid reference';
    } else if (
        err.name === 'JsonWebTokenError' ||
        err.name === 'TokenExpiredError'
    ) {
        statusCode = 401;
        message = 'Invalid or expired token';
    } else {
        console.error(err);

        statusCode = 500;
        message = 'Something went wrong';
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
};

module.exports = errorHandler;