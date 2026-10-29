function errorHandler(err, req, res, next) {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    const statusCode =
        Number.isInteger(err.statusCode) &&
        err.statusCode >= 400 &&
        err.statusCode <= 599
            ? err.statusCode
            : 500;

    const message =
        statusCode === 500
            ? 'Internal Server Error'
            : err.message || 'Request Failed';

    return res.status(statusCode).json({
        error: message
    });
}

module.exports = errorHandler;