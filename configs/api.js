import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // Backend URL

export const getRecommendations = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/recommend/`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};
