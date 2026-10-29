require('dotenv').config({ quiet: true });

module.exports = {
    PORT: process.env.PORT,
    SECRET: process.env.JWT_SECRET,
    db: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        default_database: process.env.DB_DEFAULT_DATABASE
    },
};