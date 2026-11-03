const express = require('express');
const app = express();

const routes = require('./routes');
const AppError = require('./utils/AppError');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Online Course Platform API is running'
    });
});

app.use('/api', routes);

app.use((req, res, next) => {
    next(new AppError('Route not found', 404));
});

app.use(errorHandler);

module.exports = app;