const { Sequelize } = require('sequelize');

const { Client } = require('pg');

const {
    DB_HOST,
    DB_PORT,
    DB_NAME, 
    DB_USER,
    DB_PASSWORD,
    DB_DIALECT
} = require('./env');

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_DIALECT,
        logging: false
    }
);

const databaseExists = async () => {
    const client = new Client({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: 'postgres'
    });

    try {
        await client.connect();

        const result = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [DB_NAME]
        );

        if (result.rowCount === 0) {
            await client.query(
                `CREATE DATABASE "${DB_NAME}"`
            );

            console.log(`Database "${DB_NAME}" created`);
        } else {
            console.log(`Database "${DB_NAME}" already exists`);
        }
    } finally {
        await client.end();
    }
};

module.exports = { 
    sequelize,
    databaseExists
};