import axios from "axios";

export const getPokemons = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=1000"
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching pokemons", error);
  }
};

export const getPokemon = async (id) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon", error);
  }
};
