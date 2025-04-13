import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const leaderboardService = {
  async getScores() {
    try {
      const response = await axios.get(`${BASE_URL}/leaderboard`);
      return response.data;
    } catch (error) {
      console.error("Error fetching scores:", error);
      throw error;
    }
  },

  async saveScore(scoreData) {
    try {
      const response = await axios.post(`${BASE_URL}/leaderboard`, scoreData);
      return response.data;
    } catch (error) {
      console.error("Error saving score:", error);
      throw error;
    }
  },
};

export default leaderboardService;
