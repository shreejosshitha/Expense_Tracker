import axios from "axios";

// Use environment variable with a fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};
