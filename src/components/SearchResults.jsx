import React from "react";
import PokemonCard from "./PokemonCard";

const SearchResults = ({ pokemon }) => {
  if (!pokemon) return null;

  return (
    <div className="container mx-auto px-8 mb-8">
      <h3 className="text-2xl font-semibold text-center mt-8 mb-4">
        Found Pokémon
      </h3>
      <div className="flex justify-center">
        <PokemonCard pokemon={pokemon} />
      </div>
    </div>
  );
};

export default SearchResults;
