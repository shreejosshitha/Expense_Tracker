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
} from "@mui/material";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/register", form);
      navigate("/transactions");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ff6b6b, #f06595)", // Gradient background
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
          <Typography variant="h4" fontWeight="bold" color="#ff6b6b" gutterBottom>
            Register
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={3}>
            Create an account to manage your finances
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="text"
              name="name"
              label="Full Name"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
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
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#ff6b6b",
                color: "#fff",
                padding: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                mt: 2,
                "&:hover": { backgroundColor: "#d43f3f" },
              }}
            >
              Register
            </Button>
          </form>
          <Typography variant="body2" mt={2}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#ff6b6b", fontWeight: "bold" }}>
              Login here
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
