import React from "react";

const BattleRoster = ({
  roster,
  selectedPokemonId,
  setPlayer,
  setSelectedPokemonId,
}) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {roster.map((pokemon) => (
        <li
          key={pokemon.id}
          className={`flex flex-col items-center p-4 shadow-lg rounded-none cursor-pointer hover:outline-2 hover:outline-red-500 hover:shadow-xl ${
            selectedPokemonId === pokemon.id
              ? "shadow-xl bg-red-100 outline-2 outline-red-500"
              : "bg-white"
          }`}
          onClick={() => {
            setPlayer(pokemon); // Set the entire pokemon object as the player
            setSelectedPokemonId(pokemon.id);
          }}
        >
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-24 h-24 object-cover mb-2"
          />
          <span className="text-lg font-semibold capitalize">
            {pokemon.name}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default BattleRoster;
