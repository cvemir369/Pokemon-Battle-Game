import { getPokemon } from "../services/pokeapi";

const chooseRandomPokemon = async () => {
  const randomIndex = Math.floor(Math.random() * 1000);
  const randomPokemon = await getPokemon(randomIndex + 1);
  return randomPokemon;
};

export default chooseRandomPokemon;
