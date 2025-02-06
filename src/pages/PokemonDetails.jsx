import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pokemonService from "../services/pokemonService";

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true);
        const data = await pokemonService.getPokemonById(id);
        setPokemon(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!pokemon)
    return <div className="text-center py-8">Pokemon not found</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-8 rounded-none shadow-lg max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center capitalize">
          {pokemon.name}
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-64 h-64">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Stats</h2>
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="mb-2">
                    <div className="flex justify-between">
                      <span className="capitalize">{stat.stat.name}</span>
                      <span>{stat.base_stat}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <p>Height: {pokemon.height / 10}m</p>
                <p>Weight: {pokemon.weight / 10}kg</p>
                <p>Base Experience: {pokemon.base_experience}</p>
                <h3 className="text-xl font-semibold mt-4">Abilities:</h3>
                <ul className="mt-2 space-y-1">
                  {pokemon.abilities.map((ability) => (
                    <li key={ability.ability.name} className="capitalize">
                      {ability.ability.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
