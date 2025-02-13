import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import pokemonService from "../services/pokemonService";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "http://localhost:3000/users";

export default function PokemonRoster() {
  const [pokemonIds, setPokemonIds] = useState([]);
  const [roster, setRoster] = useState([]);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.roster) {
      setPokemonIds(storedUser.roster);
    }
  }, []);

  useEffect(() => {
    const fetchRoster = async () => {
      try {
        const rosterData = await Promise.all(
          pokemonIds.map((id) => pokemonService.getPokemonById(id))
        );
        setRoster(rosterData);
      } catch (error) {
        console.error("Error fetching roster:", error);
      }
    };
    if (pokemonIds.length > 0) {
      fetchRoster();
    }
  }, [pokemonIds]);

  const removeFromRoster = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${user._id}/roster`, {
        data: { pokemonId: id },
        withCredentials: true,
      });
      setUser((prevUser) => ({
        ...prevUser,
        roster: prevUser.roster.filter((p) => p !== id),
      }));
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          roster: user.roster.filter((p) => p !== id),
        })
      );
      // Update the pokemonIds state
      const updatedPokemonIds = pokemonIds.filter(
        (pokemonId) => pokemonId !== id
      );
      setPokemonIds(updatedPokemonIds);

      // Update the roster state
      const updatedRoster = roster.filter((pokemon) => pokemon.id !== id);
      setRoster(updatedRoster);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className="bg-yellow-400 min-h-screen mt-2 pt-8">
      <div className="container mx-auto px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-black text-white py-2 px-4 rounded hover:bg-yellow-400 hover:text-black"
        >
          &larr; Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">My Roster</h1>
        {roster.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven't added any Pokémon yet!
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roster.map((pokemon) => (
              <li
                key={pokemon.id}
                className="flex flex-col items-center bg-white p-4 shadow-lg rounded-none"
              >
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-24 h-24 object-cover mb-2"
                />
                <span className="text-lg font-semibold capitalize">
                  {pokemon.name}
                </span>
                <button
                  onClick={() => removeFromRoster(pokemon.id)}
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded-none hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {/* <div className="text-left mt-8">
          <Link
            to="/"
            className="bg-transparent mt-8 cursor-pointer hover:text-white text-black font-semibold text-md"
          >
            &larr; Back to Home
          </Link>
        </div> */}
      </div>
    </section>
  );
}
