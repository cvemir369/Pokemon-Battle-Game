import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon details:", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const roster = JSON.parse(localStorage.getItem("roster")) || [];
    setIsAdded(roster.some((p) => p.id === pokemon?.id));
  }, [pokemon]);

  const addToRoster = () => {
    if (!pokemon) return;
    const roster = JSON.parse(localStorage.getItem("roster")) || [];
    if (!roster.some((p) => p.id === pokemon.id)) {
      roster.push({
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
      });
      localStorage.setItem("roster", JSON.stringify(roster));
      setIsAdded(true);
    }
  };

  if (loading) {
    return <p className="text-center py-8">Loading Pokémon details...</p>;
  }

  if (!pokemon) {
    return <p className="text-center text-red-500 py-8">Pokémon not found!</p>;
  }

  return (
    <div className="container mx-auto px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-black text-white py-2 px-4 rounded hover:bg-yellow-400 hover:text-black"
      >
        ← Back
      </button>

      <h2 className="text-3xl font-bold text-center capitalize mb-6">
        {pokemon.name}
      </h2>
      <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-40 h-auto mb-4"
        />
        <p className="text-lg">
          <strong>Height:</strong> {pokemon.height} dm
        </p>
        <p className="text-lg">
          <strong>Weight:</strong> {pokemon.weight} hg
        </p>
        <h3 className="text-xl font-semibold mt-4">Types:</h3>
        <div className="flex gap-2 mt-2">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className="bg-gray-200 px-3 py-1 rounded text-sm capitalize"
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold mt-4">Abilities:</h3>
        <ul className="mt-2 space-y-1">
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name} className="capitalize">
              {ability.ability.name}
            </li>
          ))}
        </ul>
        <button
          onClick={addToRoster}
          disabled={isAdded}
          className={`mt-6 px-6 py-2 font-semibold rounded-md ${
            isAdded
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-black text-white hover:bg-yellow-400 hover:text-black"
          }`}
        >
          {isAdded ? "Already in Roster" : "Add to Roster"}
        </button>
      </div>
    </div>
  );
}
