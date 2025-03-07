import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Box, Container } from "@mui/material";
import backgroundImage from "../assets/finance-bg.jpg"; // Make sure this image exists in your assets folder

const Home = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        padding: "20px",
      }}
    >
      <Container>
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#f8b400", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
        >
          Welcome to Personal Finance Tracker
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "#f1f1f1", textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
        >
          Take control of your finances with ease. Track income, monitor expenses, and stay on budget.
        </Typography>
        <Box mt={3}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{
              margin: "10px",
              backgroundColor: "#f8b400",
              color: "#fff",
              padding: "12px 30px",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "25px",
              boxShadow: "0px 4px 10px rgba(248, 180, 0, 0.5)",
              "&:hover": { backgroundColor: "#c99700" },
            }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            sx={{
              margin: "10px",
              backgroundColor: "#4caf50",
              color: "#fff",
              padding: "12px 30px",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "25px",
              boxShadow: "0px 4px 10px rgba(76, 175, 80, 0.5)",
              "&:hover": { backgroundColor: "#388e3c" },
            }}
          >
            Register
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
