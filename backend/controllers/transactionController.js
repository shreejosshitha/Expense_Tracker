const Transaction = require('../models/Transaction');

exports.addTransaction = (req, res) => {
  const { user_id, type, amount, category, description, date } = req.body;
  
  if (!user_id || !type || !amount || !category || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  Transaction.addTransaction(user_id, type, amount, category, description, date, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.status(201).json({ message: 'Transaction added successfully' });
  });
};

exports.getTransactionsByUser = (req, res) => {
  const { user_id } = req.params;
  
  Transaction.getTransactionsByUser(user_id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(results);
  });
};

exports.deleteTransaction = (req, res) => {
  const { transaction_id } = req.params;

  Transaction.deleteTransaction(transaction_id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'Transaction deleted successfully' });
  });
};

exports.updateTransaction = (req, res) => {
  const { transaction_id } = req.params;
  const { type, amount, category, description, date } = req.body;

  if (!type || !amount || !category || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  Transaction.updateTransaction(transaction_id, type, amount, category, description, date, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'Transaction updated successfully' });
  });
};
