// backend/db.js
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'josshitha',
  database: process.env.DB_NAME || 'budget_tracker'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
