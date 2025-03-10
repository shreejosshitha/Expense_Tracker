import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Box, Container } from "@mui/material";
import backgroundImage from "../assets/finance-bg.jpg"; // Ensure this image exists in your assets folder

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
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Glass Morphism Container */}
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          maxWidth: "800px",
          animation: "fadeIn 1.5s ease-in",
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(-20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        {/* Main Heading */}
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: "#ff6f61",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
          }}
        >
          Welcome to Personal Finance Tracker
        </Typography>

        {/* Subheading */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: "#f1f1f1",
            textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
            mb: 4,
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
          }}
        >
          Take control of your finances with ease. Track income, monitor expenses, and stay on budget.
        </Typography>

        {/* Buttons */}
        <Box
          mt={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #ff6f61, #ff9a9e)",
              color: "#fff",
              padding: "12px 30px",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "25px",
              boxShadow: "0px 4px 15px rgba(255, 111, 97, 0.5)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 6px 20px rgba(255, 111, 97, 0.8)",
              },
            }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #4caf50, #81c784)",
              color: "#fff",
              padding: "12px 30px",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "25px",
              boxShadow: "0px 4px 15px rgba(76, 175, 80, 0.5)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 6px 20px rgba(76, 175, 80, 0.8)",
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;