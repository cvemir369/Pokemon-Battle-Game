import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // For navigation between pages
import axios from "axios"; // For making HTTP requests

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]); // State to store the list of Pokémon
  const [loading, setLoading] = useState(true); // State to display loading

  useEffect(() => {
    // Make a request to the PokeAPI to get a list of Pokémon
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20") // Get the first 20 Pokémon
      .then((response) => {
        setPokemons(response.data.results); // Save the fetched data
        setLoading(false); // Change loading state to false
      })
      .catch((error) => {
        console.error("Error fetching Pokémon list:", error);
        setLoading(false); // Even on error, change the loading state
      });
  }, []); // This effect runs only once, when the component is mounted

  if (loading) {
    return <p>Loading Pokémon...</p>; // While loading, show a message
  }

  return (
    <div>
      <h1>Pokémon List</h1>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>{" "}
            {/* Link to the Pokémon details page */}
          </li>
        ))}
      </ul>
    </div>
  );
}
