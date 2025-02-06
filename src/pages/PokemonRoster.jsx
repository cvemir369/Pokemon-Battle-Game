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
    <div>
      <h1>My Roster</h1>
      {roster.length === 0 ? (
        <p>You haven't added any pokémon yet!</p>
      ) : (
        <ul>
          {roster.map((pokemon) => (
            <li key={pokemon.id}>
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                width={50}
                height={50}
              />
              <span>{pokemon.name}</span>
              <button onClick={() => removeFromRoster(pokemon.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}
