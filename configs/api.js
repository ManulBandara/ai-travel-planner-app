import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const getRecommendations = async (preferences) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recommend/`, preferences);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};
