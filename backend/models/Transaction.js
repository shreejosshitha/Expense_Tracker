const db = require('../db');

const Transaction = {
  addTransaction: (user_id, type, amount, category, description, date, callback) => {
    const sql = 'INSERT INTO transactions (user_id, type, amount, category, description, date) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [user_id, type, amount, category, description, date], callback);
  },

  getTransactionsByUser: (user_id, callback) => {
    const sql = 'SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC';
    db.query(sql, [user_id], callback);
  },

  deleteTransaction: (transaction_id, callback) => {
    const sql = 'DELETE FROM transactions WHERE id = ?';
    db.query(sql, [transaction_id], callback);
  },

  updateTransaction: (transaction_id, type, amount, category, description, date, callback) => {
    const sql = 'UPDATE transactions SET type = ?, amount = ?, category = ?, description = ?, date = ? WHERE id = ?';
    db.query(sql, [type, amount, category, description, date, transaction_id], callback);
  },
};

module.exports = Transaction;