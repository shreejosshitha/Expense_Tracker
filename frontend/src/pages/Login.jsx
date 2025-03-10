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
  InputAdornment,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import backgroundImage from "../assets/login.jpg";  // Background image
import logo from "../assets/finance-logo.jpg";  // Brand logo
// import sideImage from "../assets/login-side.jpg";  // Extra image inside the card

const Login = ({ setIsAuthenticated }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <Box
  sx={{
    height: "100vh",
    width: "100vw", // Ensures full width coverage
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat", // Prevents tiling
    backgroundAttachment: "fixed", // Keeps it fixed in place
  }}
>
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            padding: "40px",
            borderRadius: "16px",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.3)",
            animation: "fadeIn 1s ease-in",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Brand Logo */}
          <img
            src={logo}
            alt="Finance Logo"
            style={{
              width: "80px",
              marginBottom: "15px",
            }}
          />

          <Typography
            variant="h4"
            fontWeight="bold"
            color="#ffffff"
            gutterBottom
            sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
          >
            Secure Login
          </Typography>
          <Typography variant="body1" color="rgba(255, 255, 255, 0.8)" mb={3}>
            Access your financial dashboard
          </Typography>

          

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                color: "#ff4d4d",
                border: "1px solid #ff4d4d",
              }}
            >
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email style={{ color: "#ffffff" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                  "&:hover fieldset": { borderColor: "#4ade80" },
                  "& input": { color: "#ffffff" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
              }}
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock style={{ color: "#ffffff" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                  "&:hover fieldset": { borderColor: "#4ade80" },
                  "& input": { color: "#ffffff" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #4ade80, #16a34a)",
                color: "#fff",
                padding: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                mt: 2,
                borderRadius: "8px",
                boxShadow: "0px 4px 15px rgba(74, 222, 128, 0.5)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 20px rgba(74, 222, 128, 0.8)",
                },
              }}
            >
              Login
            </Button>
          </form>

          <Typography variant="body2" mt={2} color="rgba(255, 255, 255, 0.8)">
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#4ade80",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Register here
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
