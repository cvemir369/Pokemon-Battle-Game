import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

const authService = {
  signUp: async (userData) => {
    const response = await axios.post(`${BASE_URL}`, userData, {
      withCredentials: true,
    });
    return response.data;
  },

  login: async (userData) => {
    const response = await axios.post(`${BASE_URL}/login`, userData, {
      withCredentials: true,
    });
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(
      `${BASE_URL}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  getUser: async (userId) => {
    const response = await axios.get(`${BASE_URL}/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  },

  updateUser: async (userId, userData) => {
    try {
      // First update user data
      await axios.put(`${BASE_URL}/${userId}`, userData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // If image URL is provided, update it
      if (userData.image) {
        await axios.patch(
          `${BASE_URL}/${userId}`,
          { image: userData.image },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Fetch the latest user data after all updates
      const updatedUserResponse = await axios.get(`${BASE_URL}/${userId}`, {
        withCredentials: true,
      });

      return updatedUserResponse.data; // Return the fresh user data
    } catch (error) {
      console.error("AuthService update error:", error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    const response = await axios.delete(`${BASE_URL}/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  },

  verifyUser: async (verificationToken) => {
    const response = await axios.post(
      `${BASE_URL}/verify/${verificationToken}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  },
};

export default authService;
