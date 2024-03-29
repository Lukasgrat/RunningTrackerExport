const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT || "10000")
};

const pool = mysql.createPool(dbConfig);
module.exports = pool;