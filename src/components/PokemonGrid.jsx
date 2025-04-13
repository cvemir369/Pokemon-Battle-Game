import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import PaginationButtons from "./PaginationButtons";
import pokemonService from "../services/pokemonService";

const ITEMS_PER_PAGE = 9;

const PokemonGrid = ({ searchQuery }) => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  const fetchPokemons = async (page) => {
    try {
      setIsLoading(true);
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const data = await pokemonService.getAllPokemons(ITEMS_PER_PAGE, offset);
      const pokemonDetails = await Promise.all(
        data.results.map((pokemon) =>
          pokemonService.getPokemonDetails(pokemon.url)
        )
      );
      setPokemons(pokemonDetails);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="container mx-auto px-8">
      <h3 className="text-2xl font-semibold text-center mt-16 mb-4">
        Available Pokémons
      </h3>
      <section className="pokemons grid grid-cols-1 md:grid-cols-3 gap-4 p-8 place-items-center">
        {pokemons?.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
      <PaginationButtons
        currentPage={currentPage}
        onPreviousClick={handlePreviousPage}
        onNextClick={handleNextPage}
      />
    </div>
  );
};

export default PokemonGrid;
