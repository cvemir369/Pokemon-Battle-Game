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
      // Store initial response from PUT request
      const putResponse = await axios.put(`${BASE_URL}/${userId}`, userData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      let finalUserData = putResponse.data;

      // If image URL is provided, update it and get the response
      if (userData.image) {
        const imageResponse = await axios.patch(
          `${BASE_URL}/${userId}`,
          { image: userData.image },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        finalUserData = imageResponse.data;
      }

      // Store the updated user data in localStorage
      localStorage.setItem("user", JSON.stringify(finalUserData));

      return finalUserData;
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
