// import mysql from 'mysql2/promise';
const mysql = require('mysql2/promise');
require("dotenv").config();

const conn = mysql.createPool({
  host: process.env.LOCAL_DB_HOST,
  user: process.env.LOCAL_DB_USER,
  password: process.env.LOCAL_DB_PASSWORD,
  database: process.env.LOCAL_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

console.log("Database connection has been succesfully created!");

module.exports = conn;
