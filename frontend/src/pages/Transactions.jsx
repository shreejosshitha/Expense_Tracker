import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, Paper, TextField, MenuItem, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, IconButton, Snackbar, Alert
} from '@mui/material';
import { FaTrash, FaEdit, FaPlus, FaArrowUp, FaArrowDown, FaMoneyBillWave } from 'react-icons/fa';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'income',
    category: '',
    date: new Date().toISOString().slice(0, 16), // Default to current date-time
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for Snackbar
  const [monthlyBudget, setMonthlyBudget] = useState(' '); // Monthly budget
  const [budgetAlertOpen, setBudgetAlertOpen] = useState(false); // Budget exceeded alert
  const [selectedMonth, setSelectedMonth] = useState(''); // Selected month for filtering

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/transactions');
      setTransactions(res.data);
      checkBudgetExceeded(res.data); // Check if budget is exceeded
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transactionData = { ...form, user_id: 1 };

      if (editingId) {
        await axios.put(`http://localhost:8000/api/transactions/${editingId}`, transactionData);
        setSnackbarMessage('Transaction updated successfully!');
      } else {
        await axios.post('http://localhost:8000/api/transactions', transactionData);
        setSnackbarMessage('Transaction added successfully!');
      }

      fetchTransactions();
      setForm({
        description: '',
        amount: '',
        type: 'income',
        category: '',
        date: new Date().toISOString().slice(0, 16),
      });
      setOpen(false);
      setSnackbarOpen(true); // Show success message
    } catch (error) {
      console.error('Error adding/updating transaction:', error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/transactions/${id}`);
      fetchTransactions();
      setSnackbarMessage('Transaction deleted successfully!');
      setSnackbarOpen(true); // Show success message
    } catch (error) {
      console.error('Error deleting transaction:', error.response?.data || error.message);
    }
  };

  const getTotal = (type) =>
    transactions.filter((txn) => txn.type === type).reduce((total, txn) => total + Number(txn.amount), 0);

  const totalSavings = getTotal('income') - getTotal('expense'); // Calculate total savings

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false); // Close Snackbar
  };

  const handleBudgetChange = (e) => {
    setMonthlyBudget(e.target.value);
  };

  const checkBudgetExceeded = (transactions) => {
    const totalExpenses = getTotal('expense');
    if (monthlyBudget > 0 && totalExpenses > monthlyBudget) {
      setBudgetAlertOpen(true); // Show budget exceeded alert
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Filter transactions by selected month
  const filteredTransactions = transactions.filter(txn => {
    const transactionMonth = new Date(txn.date).toLocaleString('default', { month: 'short' });
    return (
      (selectedMonth ? transactionMonth === selectedMonth : true) &&
      (txn.description.toLowerCase().includes(search.toLowerCase()) ||
       txn.category.toLowerCase().includes(search.toLowerCase()))
    );
  });

  // Get unique months from transactions
  const getUniqueMonths = () => {
    const months = transactions.map(txn => new Date(txn.date).toLocaleString('default', { month: 'short' }));
    return [...new Set(months)];
  };

  return (
    <Box sx={{ maxWidth: '900px', margin: 'auto', padding: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" color="primary" sx={{ mb: 4, textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
        💰 My Transactions
      </Typography>

      {/* Summary Section */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ 
            padding: 2, 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, #4CAF50, #81C784)', 
            color: 'white', 
            borderRadius: 2,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': { transform: 'scale(1.05)' }
          }}>
            <FaArrowUp size={24} />
            <Typography variant="h6">Income</Typography>
            <Typography variant="h5">₹{getTotal('income')}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ 
            padding: 2, 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, #F44336, #E57373)', 
            color: 'white', 
            borderRadius: 2,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': { transform: 'scale(1.05)' }
          }}>
            <FaArrowDown size={24} />
            <Typography variant="h6">Expenses</Typography>
            <Typography variant="h5">₹{getTotal('expense')}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ 
            padding: 2, 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, #2196F3, #64B5F6)', 
            color: 'white', 
            borderRadius: 2,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': { transform: 'scale(1.05)' }
          }}>
            <FaMoneyBillWave size={24} />
            <Typography variant="h6">Savings</Typography>
            <Typography variant="h5">₹{totalSavings}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Budget Input */}
      <TextField
        fullWidth
        label="💸 Set Monthly Budget"
        variant="outlined"
        type="number"
        value={monthlyBudget}
        onChange={handleBudgetChange}
        sx={{ mt: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
      />

      {/* Month Filter */}
      <TextField
        fullWidth
        select
        label="Filter by Month"
        variant="outlined"
        value={selectedMonth}
        onChange={handleMonthChange}
        sx={{ mt: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
      >
        <MenuItem value="">All Months</MenuItem>
        {getUniqueMonths().map((month) => (
          <MenuItem key={month} value={month}>
            {month}
          </MenuItem>
        ))}
      </TextField>

      {/* Search Bar */}
      <TextField
        fullWidth
        label="🔍 Search transactions..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mt: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
      />

      {/* Add Transaction Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<FaPlus />}
        sx={{ 
          mt: 2, 
          background: 'linear-gradient(135deg, #FF6F61, #FFA07A)', 
          color: 'white', 
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': { transform: 'scale(1.05)', background: 'linear-gradient(135deg, #FFA07A, #FF6F61)' }
        }}
        onClick={() => {
          setForm({
            description: '',
            amount: '',
            type: 'income',
            category: '',
            date: new Date().toISOString().slice(0, 16),
          });
          setEditingId(null);
          setOpen(true);
        }}
      >
        Add Transaction
      </Button>

      {/* Transactions Table */}
      <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Description</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Amount</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Type</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Category</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Date</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((txn) => (
              <TableRow
                key={txn.id}
                sx={{
                  '&:hover': { bgcolor: '#f5f5f5' },
                  transition: 'background-color 0.3s ease',
                }}
              >
                <TableCell sx={{ fontSize: '0.9rem' }}>{txn.description}</TableCell>
                <TableCell sx={{ color: txn.type === 'income' ? '#28a745' : '#dc3545', fontWeight: 'bold', fontSize: '0.9rem' }}>₹{txn.amount}</TableCell>
                <TableCell sx={{ fontSize: '0.9rem' }}>{txn.type}</TableCell>
                <TableCell sx={{ fontSize: '0.9rem' }}>{txn.category}</TableCell>
                <TableCell sx={{ fontSize: '0.9rem' }}>
                  {new Date(txn.date).toLocaleString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => { setForm(txn); setEditingId(txn.id); setOpen(true); }}
                    sx={{ '&:hover': { bgcolor: '#1976d2', color: 'white' } }}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(txn.id)}
                    sx={{ '&:hover': { bgcolor: '#dc3545', color: 'white' } }}
                  >
                    <FaTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Transaction Form Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editingId ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth name="description" label="Description" value={form.description} onChange={handleChange} sx={{ mt: 2 }} />
          <TextField fullWidth name="amount" label="Amount" type="number" value={form.amount} onChange={handleChange} sx={{ mt: 2 }} />
          <TextField fullWidth select name="type" label="Type" value={form.type} onChange={handleChange} sx={{ mt: 2 }}>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>
          <TextField fullWidth name="category" label="Category" value={form.category} onChange={handleChange} sx={{ mt: 2 }} />
          <TextField fullWidth name="date" label="Date" type="datetime-local" value={form.date} onChange={handleChange} sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>{editingId ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      {/* Success Message Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Budget Exceeded Alert */}
      <Snackbar
        open={budgetAlertOpen}
        autoHideDuration={5000}
        onClose={() => setBudgetAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setBudgetAlertOpen(false)} severity="warning" sx={{ width: '100%' }}>
          ⚠️ Monthly budget exceeded! Total expenses: ₹{getTotal('expense')}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Transactions;