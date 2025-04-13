import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import PokemonGrid from "../components/PokemonGrid";
import SearchResults from "../components/SearchResults";
import pokemonService from "../services/pokemonService";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async (query) => {
    if (!query || query.length < 2) {
      setSearchedPokemon(null);
      setSearchError(null);
      return;
    }

    try {
      setIsSearching(true);
      setSearchError(null);
      const pokemon = await pokemonService.getPokemonById(query.toLowerCase());
      setSearchedPokemon(pokemon);
    } catch (error) {
      console.error("Pokemon not found:", error);
      setSearchedPokemon(null);
      setSearchError("Pokemon not found. Please try another name or ID.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-yellow-400 min-h-screen mt-2 pt-8">
      <HeroSection onSearch={handleSearch} />
      {isSearching ? (
        <div className="text-center py-4">Searching...</div>
      ) : searchError ? (
        <div className="text-center text-red-600 py-4">{searchError}</div>
      ) : (
        <SearchResults pokemon={searchedPokemon} />
      )}
      <PokemonGrid />
    </div>
  );
};

export default Home;
