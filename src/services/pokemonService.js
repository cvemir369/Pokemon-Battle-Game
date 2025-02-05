import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

const pokemonService = {
  async getAllPokemons(limit = 9) {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}`);
      if (!response.data) throw new Error("No data received");
      return response.data;
    } catch (error) {
      console.error("Error fetching all pokemons:", error);
      throw error;
    }
  },

  async getPokemonDetails(url) {
    try {
      const response = await axios.get(url);
      if (!response.data) throw new Error("No pokemon details received");
      return response.data;
    } catch (error) {
      console.error("Error fetching pokemon details:", error);
      throw error;
    }
  },

  async getPokemonById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
      if (!response.data) throw new Error("No pokemon found");
      return response.data;
    } catch (error) {
      console.error("Error fetching pokemon by id:", error);
      throw error;
    }
  },
};

export default pokemonService;
