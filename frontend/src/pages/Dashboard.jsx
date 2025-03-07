import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from "recharts";
import {
  Card, CardContent, Typography, Grid, LinearProgress, Box, Avatar, CircularProgress,
  TextField, Button, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [savingsProgressData, setSavingsProgressData] = useState([]); // For Savings Progress Chart
  const [monthlyData, setMonthlyData] = useState([]); // For Bar Chart
  const [savingsGoal, setSavingsGoal] = useState(100000); // Savings goal
  const [currentSavings, setCurrentSavings] = useState(0); // Current savings (income - expenses)
  const [goalInput, setGoalInput] = useState(""); // Input for setting savings goal
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/transactions");
      console.log("Fetched Transactions:", res.data); // Debugging
      setTransactions(res.data);
      calculateTotals(res.data);
      calculateSavingsProgress(res.data); // Calculate data for Savings Progress Chart
      calculateMonthlyData(res.data); // Calculate data for Bar Chart
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  };

  const calculateTotals = (transactions) => {
    let income = 0, expense = 0;
    transactions.forEach((txn) => {
      const amount = parseFloat(txn.amount);
      txn.type === "income" ? (income += amount) : (expense += amount);
    });
    setTotalIncome(income);
    setTotalExpense(expense);
    setCurrentSavings(income - expense); // Update current savings
  };

  const calculateSavingsProgress = (transactions) => {
    const monthlySavings = {};
    transactions.forEach((txn) => {
      const month = new Date(txn.date).toLocaleString("default", { month: "short" });
      if (!monthlySavings[month]) monthlySavings[month] = { income: 0, expense: 0 };
      txn.type === "income" ? monthlySavings[month].income += parseFloat(txn.amount) : monthlySavings[month].expense += parseFloat(txn.amount);
    });

    const savingsData = [];
    let cumulativeSavings = 0;
    Object.keys(monthlySavings).forEach((month) => {
      cumulativeSavings += monthlySavings[month].income - monthlySavings[month].expense;
      savingsData.push({
        name: month,
        savings: cumulativeSavings,
      });
    });

    setSavingsProgressData(savingsData);
  };

  const calculateMonthlyData = (transactions) => {
    const monthly = {};
    transactions.forEach((txn) => {
      const month = new Date(txn.date).toLocaleString("default", { month: "short" });
      if (!monthly[month]) monthly[month] = { income: 0, expense: 0 };
      txn.type === "income" ? monthly[month].income += parseFloat(txn.amount) : monthly[month].expense += parseFloat(txn.amount);
    });
    setMonthlyData(Object.keys(monthly).map(month => ({
      name: month,
      income: monthly[month].income,
      expense: monthly[month].expense,
    })));
  };

  useEffect(() => {
    console.log("Savings Progress Data Updated:", savingsProgressData); // Debugging
  }, [savingsProgressData]);

  const handleSetSavingsGoal = () => {
    const goal = parseFloat(goalInput);
    if (!isNaN(goal) && goal > 0) {
      setSavingsGoal(goal);
      setSnackbarMessage("Savings goal updated successfully!");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("Please enter a valid number for the savings goal.");
      setSnackbarOpen(true);
    }
  };

  // Separate transactions into incomes and expenses
  const incomes = transactions.filter(txn => txn.type === "income");
  const expenses = transactions.filter(txn => txn.type === "expense");

  return (
    <Box sx={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold", textAlign: "center", color: "#333", textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}>
        Personal Finance Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            background: "linear-gradient(135deg, #4CAF50, #81C784)", 
            color: "white", 
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", 
            borderRadius: 2,
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.05)" }
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>Total Income</Typography>
              <Typography variant="h4" sx={{ marginTop: 1 }}>₹{totalIncome.toFixed(2)}</Typography>
              <LinearProgress variant="determinate" value={totalIncome / (totalIncome + totalExpense) * 100} sx={{ marginTop: 2, height: 8, borderRadius: 5, backgroundColor: "#388E3C" }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            background: "linear-gradient(135deg, #F44336, #E57373)", 
            color: "white", 
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", 
            borderRadius: 2,
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.05)" }
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>Total Expenses</Typography>
              <Typography variant="h4" sx={{ marginTop: 1 }}>₹{totalExpense.toFixed(2)}</Typography>
              <LinearProgress variant="determinate" value={totalExpense / (totalIncome + totalExpense) * 100} sx={{ marginTop: 2, height: 8, borderRadius: 5, backgroundColor: "#D32F2F" }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ 
            background: "linear-gradient(135deg, #2196F3, #64B5F6)", 
            color: "white", 
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", 
            borderRadius: 2,
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.05)" }
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>Balance</Typography>
              <Typography variant="h4" sx={{ marginTop: 1 }}>₹{(totalIncome - totalExpense).toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Savings Goal Tracker */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center", color: "#333", textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}>
          Savings Goal Tracker
        </Typography>
        <Card sx={{ 
          background: "white", 
          borderRadius: 2, 
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", 
          padding: "20px",
          transition: "transform 0.3s ease-in-out",
          "&:hover": { transform: "scale(1.02)" }
        }}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>Goal: ₹{savingsGoal.toLocaleString()}</Typography>
              <Typography variant="body1" sx={{ color: "#666" }}>
                You have saved ₹{currentSavings.toLocaleString()} so far.
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(currentSavings / savingsGoal) * 100}
                sx={{ marginTop: 2, height: 10, borderRadius: 5, backgroundColor: "#e0e0e0" }}
              />
              <Typography variant="body2" sx={{ marginTop: 1, textAlign: "right", color: "#666" }}>
                {((currentSavings / savingsGoal) * 100).toFixed(1)}% completed
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress
                variant="determinate"
                value={(currentSavings / savingsGoal) * 100}
                size={120}
                thickness={5}
                sx={{ color: "#4CAF50" }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              label="Set Savings Goal"
              variant="outlined"
              type="number"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSetSavingsGoal}
            >
              Set Goal
            </Button>
          </Box>
        </Card>
      </Box>

      {/* Income and Expense Tables */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {/* Income Table */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
            Income Transactions
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
            <Table>
              <TableHead sx={{ bgcolor: "#4CAF50" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Amount</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incomes.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>{txn.description}</TableCell>
                    <TableCell sx={{ color: "#28a745", fontWeight: "bold" }}>₹{txn.amount}</TableCell>
                    <TableCell>{txn.category}</TableCell>
                    <TableCell>
                      {new Date(txn.date).toLocaleString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Expense Table */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
            Expense Transactions
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
            <Table>
              <TableHead sx={{ bgcolor: "#F44336" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Amount</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>{txn.description}</TableCell>
                    <TableCell sx={{ color: "#dc3545", fontWeight: "bold" }}>₹{txn.amount}</TableCell>
                    <TableCell>{txn.category}</TableCell>
                    <TableCell>
                      {new Date(txn.date).toLocaleString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} justifyContent="center" sx={{ marginTop: "20px" }}>
        {/* Bar Chart - Income vs Expenses */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", 
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.02)" }
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>Income vs Expenses (Monthly)</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#4CAF50" name="Income" />
                  <Bar dataKey="expense" fill="#F44336" name="Expense" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Line Chart - Savings Progress */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", 
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.02)" }
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>Savings Progress Over Time</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={savingsProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="savings" stroke="#2196F3" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;