require('dotenv').config();

const env = {
    PORT: process.env.PORT || 3000,

    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT || 5432,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DIALECT: process.env.DB_DIALECT,

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

    NODE_ENV: process.env.NODE_ENV || 'development',
};

const requiredEnv = [
    'DB_HOST',
    'DB_NAME',
    'DB_USER',
    'DB_DIALECT',
    'JWT_SECRET'
];

for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

module.exports = env;