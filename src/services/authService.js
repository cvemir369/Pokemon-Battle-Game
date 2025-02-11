import axios from "axios";

const BASE_URL = "http://localhost:3000/api/users";

const authService = {
  signUp: async (userData) => {
    const response = await axios.post(`${BASE_URL}`, userData);
    return response.data;
  },
  login: async (userData) => {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data;
  },
  logout: async () => {
    const response = await axios.post(`${BASE_URL}/logout`);
    return response.data;
  },
  getUser: async (userId) => {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  },
  updateUser: async (userId, userData) => {
    const response = await axios.put(`${BASE_URL}/${userId}`, userData);
    return response.data;
  },
  deleteUser: async (userId) => {
    const response = await axios.delete(`${BASE_URL}/${userId}`);
    return response.data;
  },
  verifyUser: async (verificationToken) => {
    const response = await axios.post(
      `${BASE_URL}/verify/${verificationToken}`
    );
    return response.data;
  },
};

export default authService;
