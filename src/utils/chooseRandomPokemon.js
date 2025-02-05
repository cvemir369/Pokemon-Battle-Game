import { getPokemon } from "../services/pokeapi";

const chooseRandomPokemon = async () => {
  const randomIndex = Math.floor(Math.random() * 1000);
  const randomPokemon = await getPokemon(randomIndex + 1);
  const id = randomPokemon.id;
  const name = randomPokemon.name;
  const hp = randomPokemon.stats[0].base_stat;
  const attack = randomPokemon.stats[1].base_stat;
  const defense = randomPokemon.stats[2].base_stat;
  const specialAttack = randomPokemon.stats[3].base_stat;
  const specialDefense = randomPokemon.stats[4].base_stat;
  const speed = randomPokemon.stats[5].base_stat;
  return {
    id: id,
    name: name,
    hp: hp,
    attack: attack,
    defense: defense,
    specialAttack: specialAttack,
    specialDefense: specialDefense,
    speed: speed,
  };
};

export default chooseRandomPokemon;
