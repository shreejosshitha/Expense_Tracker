import { blue } from "@mui/material/colors";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    navigate("/"); // Redirect to Home page
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>Personal <span style={styles.highlight}>Finance Tracker</span></div>
      <div style={styles.navLinks}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/transactions" style={styles.link}>Transactions</Link>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "linear-gradient(90deg, #1F1C2C, #928DAB)", // Elegant dark-to-light gradient
    color: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    fontFamily: "'Poppins', sans-serif",
  },
  logo: {
    fontSize: "26px",
    fontWeight: "bold",
    letterSpacing: "1px",
    color: "white", // Gold for premium look
  },
  highlight: {
    color: "white", // Vibrant red to make it pop
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "#f1f1f1",
    textDecoration: "none",
    fontSize: "17px",
    fontWeight: "500",
    padding: "10px 18px",
    borderRadius: "6px",
    transition: "0.3s ease-in-out",
    fontFamily: "'Poppins', sans-serif",
  },
  logoutButton: {
    background: "#E63946", // Bold red for logout
    color: "#fff",
    fontSize: "17px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s ease-in-out",
    fontFamily: "'Poppins', sans-serif",
  },
};

export default Navbar;
