const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');
const AppError = require('../utils/AppError');

const {
    getUserByUsernameQuery,
    createUserQuery
} = require('../queries/users.queries');

if (!SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

async function register(username, password) {
    if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        !username.trim() ||
        username.trim().length > 100 ||
        password.length < 8
    ) {
        throw new AppError(400, 'Invalid username or password');
    }

    const normalizedUsername = username.trim();

    const existingUser = await getUserByUsernameQuery(
        normalizedUsername
    );

    if (existingUser.rows.length > 0) {
        throw new AppError(409, 'Username already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    try {
        const result = await createUserQuery(
            normalizedUsername,
            passwordHash
        );

        return result.rows[0];
    } catch (error) {
        if (error.code === '23505') {
            throw new AppError(409, 'Username already exists');
        }

        throw error;
    }
}

async function login(username, password) {
    if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        !username.trim() ||
        !password
    ) {
        throw new AppError(
            400,
            'Username and password are required'
        );
    }

    const result = await getUserByUsernameQuery(
        username.trim()
    );

    const user = result.rows[0];

    if (
        !user ||
        !(await bcrypt.compare(password, user.password_hash))
    ) {
        throw new AppError(401, 'Invalid credentials');
    }

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        SECRET,
        { expiresIn: '2h' }
    );

    return token;
}

module.exports = {
    register,
    login
};