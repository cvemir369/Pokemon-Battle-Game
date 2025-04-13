import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pokemonService from "../services/pokemonService";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const BASE_URL =
  `${import.meta.env.VITE_BASE_URL}/users` || "http://localhost:3000/users";

export default function PokemonDetails() {
  const { user, setUser, isAuthenticated } = useAuth(); // Get the authenticated user from context
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Pokémon details from the service
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

  // Check if Pokémon is in the roster
  useEffect(() => {
    if (!pokemon || !isAuthenticated) return;
    setIsAdded(user.roster.some((p) => p === pokemon.id));
  }, [pokemon]);

  // Add Pokémon to the roster
  const addToRoster = async () => {
    if (!pokemon) return;
    try {
      await axios.patch(
        `${BASE_URL}/${user._id}/roster`,
        { pokemonId: pokemon.id },
        {
          withCredentials: true,
        }
      );
      setUser((prevUser) => ({
        ...prevUser,
        roster: [...prevUser.roster, pokemon.id],
      }));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, roster: [...user.roster, pokemon.id] })
      );
      setIsAdded(true);
      toast.success(`${pokemon.name} added to roster!`);
    } catch (error) {
      setError(error.message);
    }
  };

  // Remove Pokémon from the roster
  const removeFromRoster = async () => {
    if (!pokemon) return;
    try {
      await axios.delete(`${BASE_URL}/${user._id}/roster`, {
        data: { pokemonId: pokemon.id },
        withCredentials: true,
      });
      setUser((prevUser) => ({
        ...prevUser,
        roster: prevUser.roster.filter((p) => p !== pokemon.id),
      }));
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          roster: user.roster.filter((p) => p !== pokemon.id),
        })
      );
      setIsAdded(false);
      toast.error(`${pokemon.name} removed from roster!`);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p className="text-center py-8">Loading Pokémon details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-8">{error}</p>;
  }

  if (!pokemon) {
    return <p className="text-center py-8">Pokémon not found!</p>;
  }

  return (
    <section className="bg-yellow-400 min-h-screen mt-2 pt-8">
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
        <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-none">
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
                className="bg-gray-200 px-3 py-1 rounded-none text-sm capitalize"
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

          <h3 className="text-xl font-semibold mt-4">Stats:</h3>
          <div className="grid grid-cols-2 gap-4">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="mb-2 flex justify-between">
                <span className="capitalize">{stat.stat.name}:</span>
                <span>{stat.base_stat}</span>
              </div>
            ))}
          </div>

          <button
            onClick={!isAdded ? addToRoster : removeFromRoster}
            className={`mt-6 px-6 py-2 font-semibold rounded-md cursor-pointer ${
              isAdded
                ? "bg-gray-400 text-white hover:bg-red-500"
                : "bg-black text-white hover:bg-yellow-400 hover:text-black"
            }`}
          >
            {isAdded ? "Remove from Roster" : "Add to Roster"}
          </button>
        </div>
      </div>
    </section>
  );
}
