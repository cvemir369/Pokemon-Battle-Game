import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PokemonRoster() {
  const [roster, setRoster] = useState([]);

  useEffect(() => {
    setRoster(JSON.parse(localStorage.getItem("roster")) || []);
  }, []);

  const removeFromRoster = (id) => {
    const updatedRoster = roster.filter((pokemon) => pokemon.id !== id);
    setRoster(updatedRoster);
    localStorage.setItem("roster", JSON.stringify(updatedRoster));
  };

  return (
    <div className="container mx-auto px-8 py-12">
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
              className="flex flex-col items-center bg-white p-4 shadow-lg rounded-lg"
            >
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="w-24 h-24 object-cover mb-2"
              />
              <span className="text-lg font-semibold capitalize">
                {pokemon.name}
              </span>
              <button
                onClick={() => removeFromRoster(pokemon.id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="text-center mt-8">
        <Link
          to="/"
          className="bg-black text-white px-6 py-2 rounded hover:bg-yellow-400 hover:text-black"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
