const {
    register: registerService,
    login: loginService
} = require('../services/authService');

async function register(req, res, next) {
    try {
        const user = await registerService(
            req.body.username,
            req.body.password
        );

        return res.status(201).json(user);
    } catch (error) {
        return next(error);
    }
}

async function login(req, res, next) {
    try {
        const token = await loginService(
            req.body.username,
            req.body.password
        );

        return res.status(200).json({ token });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    register,
    login
};