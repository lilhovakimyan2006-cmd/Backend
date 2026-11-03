const bcrypt = require('bcryptjs');

const { User } = require('../models');
const { generateToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');

const ROLES = require('../constants/roles');
const AUTH_ERRORS = require('../constants/errors/auth.errors');
const USER_ERRORS = require('../constants/errors/user.errors');

const register = async ({ fullName, email, password }) => {
    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {
        throw new AppError(
            USER_ERRORS.EMAIL_EXISTS.message,
            USER_ERRORS.EMAIL_EXISTS.statusCode
        );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        role: ROLES.STUDENT
    });

    const token = generateToken({
        id: user.id,
        role: user.role
    });

    const userData = user.toJSON();
    delete userData.password;

    return {
        user: userData,
        token
    };
};

const login = async ({ email, password }) => {
    const user = await User.unscoped().findOne({
        where: { email }
    });

    if (!user) {
        throw new AppError(
            AUTH_ERRORS.INVALID_CREDENTIALS.message,
            AUTH_ERRORS.INVALID_CREDENTIALS.statusCode
        );
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new AppError(
            AUTH_ERRORS.INVALID_CREDENTIALS.message,
            AUTH_ERRORS.INVALID_CREDENTIALS.statusCode
        );
    }

    const token = generateToken({
        id: user.id,
        role: user.role
    });

    const userData = user.toJSON();
    delete userData.password;

    return {
        user: userData,
        token
    };
};

module.exports = {
    register,
    login
};