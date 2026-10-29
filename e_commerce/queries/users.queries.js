const pool = require('../data/db');

async function getUserByUsernameQuery(username) {
    return pool.query(
        `SELECT id, username, password_hash, role
         FROM users
         WHERE username = $1`,
        [username]
    );
}

async function createUserQuery(username, passwordHash) {
    return pool.query(
        `INSERT INTO users (username, password_hash, role)
         VALUES ($1, $2, $3)
         RETURNING id, username, role`,
        [username, passwordHash, 'customer']
    );
}

async function getUserByIdQuery(userId) {
    return pool.query(
        `SELECT id, username, role
         FROM users
         WHERE id = $1`,
        [userId]
    );
}

module.exports = {
    getUserByUsernameQuery,
    createUserQuery,
    getUserByIdQuery
};