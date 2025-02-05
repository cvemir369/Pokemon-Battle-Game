import { useEffect, useState } from "react";
import pokemonService from "../services/pokemonService";
import HeroSection from "../components/HeroSection";
import PokemonCard from "../components/PokemonCard";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleUsernameSubmit = (username) => {
    console.log("Username submitted:", username);
    // Add your username submission logic here
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsLoading(true);
        const data = await pokemonService.getAllPokemons();
        const pokemonDetails = await Promise.all(
          data.results.map((pokemon) =>
            pokemonService.getPokemonDetails(pokemon.url)
          )
        );
        setPokemons(pokemonDetails);
      } catch (error) {
        console.error("Error fetching pokemon:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-yellow-400 min-h-screen mt-2 pt-8">
      <HeroSection onSubmit={handleUsernameSubmit} />
      <div className="container mx-auto px-8">
        <h3 className="text-2xl font-semibold text-center mt-16 mb-4">
          Available Pokémons
        </h3>
        <section className="pokemons grid grid-cols-1 md:grid-cols-3 gap-4 p-8 place-items-center">
          {pokemons?.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;
