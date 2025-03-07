import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
  Alert,
} from "@mui/material";

const Login = ({ setIsAuthenticated }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before attempting login

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", form);

      // Store token & user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setIsAuthenticated(true);
      navigate("/transactions"); // Redirect after successful login
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #3b82f6, #9333ea)", // Gradient background
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: "30px",
            borderRadius: "12px",
            textAlign: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="#3b82f6" gutterBottom>
            Login
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={3}>
            Sign in to your account
          </Typography>

          {/* Show error message if login fails */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              margin="normal"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#3b82f6",
                color: "#fff",
                padding: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                mt: 2,
                "&:hover": { backgroundColor: "#2563eb" },
              }}
            >
              Login
            </Button>
          </form>

          <Typography variant="body2" mt={2}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#3b82f6", fontWeight: "bold" }}>
              Register here
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
