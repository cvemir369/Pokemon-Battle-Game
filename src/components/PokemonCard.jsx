import React from "react";
import { Link } from "react-router-dom";

const typeColors = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-blue-300",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

const PokemonCard = ({ pokemon }) => {
  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className="card bg-white p-4 rounded-none shadow hover:shadow-lg w-64 flex flex-col items-center"
    >
      <div className="w-full h-32 mb-2 flex justify-center items-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-auto h-32 object-cover"
        />
      </div>
      <h2 className="text-xl font-bold text-center mb-2">{pokemon.name}</h2>
      <div className="flex gap-2">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className={`${
              typeColors[type.type.name]
            } text-white text-xs px-2 py-1`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default PokemonCard;
