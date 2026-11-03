const express = require('express');
const Joi = require('joi');

const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

const registerSchema = Joi.object({
    fullName: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(6).max(100).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

router.post(
    '/register',
    validate(registerSchema),
    asyncHandler(authController.register)
);

router.post(
    '/login',
    validate(loginSchema),
    asyncHandler(authController.login)
);

router.get(
    '/me',
    authenticate,
    asyncHandler(authController.getMe)
);

module.exports = router;