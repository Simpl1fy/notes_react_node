const mysql = require('mysql');
require('dotenv').config();

const conn = mysql.createPool({
    connectionLimit: 10,
    host: process.env.LOCAL_DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "notes_db"
})

module.exports = conn;