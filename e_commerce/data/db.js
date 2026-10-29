const { Pool } = require('pg');
const { db } = require('../config');

const pool = new Pool({
    host: db.host,
    port: Number(db.port),
    user: db.user,
    password: db.password,
    database: db.database,
});

module.exports = pool;