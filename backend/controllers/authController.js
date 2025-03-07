const User = require('../models/User');

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  User.findUserByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    if (result.length > 0) return res.status(400).json({ message: 'Email already exists' });

    // Store password as plain text (not secure, but as per request)
    User.createUser(name, email, password, (err) => {
      if (err) return res.status(500).json({ message: 'Error creating user', error: err.message });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    if (result.length === 0 || result[0].password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // No JWT, just return user details
    res.json({ user: { id: result[0].id, name: result[0].name, email: result[0].email } });
  });
};
