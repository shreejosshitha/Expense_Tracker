const express = require('express');
const cors = require('cors');
const mysql = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// User Registration
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  mysql.query(sql, [name, email, password], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// User Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  mysql.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const user = results[0];
    res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  });
});

// Add Transaction
app.post('/api/transactions', (req, res) => {
  const { user_id, type, amount, category, description, date } = req.body;
  if (!user_id || !type || !amount || !category || !description || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  const sql = 'INSERT INTO transactions (user_id, type, amount, category, description, date) VALUES (?, ?, ?, ?, ?, ?)';
  mysql.query(sql, [user_id, type, amount, category, description, date], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.status(201).json({ message: 'Transaction added successfully' });
  });
});

// Get All Transactions
app.get('/api/transactions', (req, res) => {
  const sql = 'SELECT * FROM transactions';
  mysql.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(results);
  });
});

/// Update Transaction
app.put('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  const { user_id, type, amount, category, description, date } = req.body;

  const sql = "UPDATE transactions SET user_id=?, type=?, amount=?, category=?, description=?, date=? WHERE id=?";
  
  mysql.query(sql, [user_id, type, amount, category, description, date, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'Transaction updated successfully' });
  });
});

app.get('/api/transactions/:userId', (req, res) => {
  const { userId } = req.params;
  console.log("Fetching transactions for user:", userId);
  
  const sql = 'SELECT * FROM transactions WHERE user_id = ?';
  mysql.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    res.json(results);
  });
});




// Delete Transaction
app.delete('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  console.log('Deleting transaction with ID:', id);

  if (!id) {
    return res.status(400).json({ message: 'Transaction ID is required' });
  }

  const sql = 'DELETE FROM transactions WHERE id = ?';
  mysql.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting transaction:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  });
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
