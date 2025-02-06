import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PokemonDetails() {
  const { id } = useParams(); // Extract the Pokémon's ID (or name) from the URL
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Pokémon details by name (id) from the PokeAPI
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data); // Save the Pokémon data
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching Pokémon details:", error);
        setLoading(false);
      });
  }, [id]); // Effect runs when the id changes (when navigating to a different Pokémon)

  if (loading) {
    return <p>Loading Pokémon details...</p>;
  }

  if (!pokemon) {
    return <p>Pokémon not found!</p>;
  }

  return (
    <div>
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>{" "}
      {/* Display Pokémon name */}
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />{" "}
      {/* Display Pokémon image */}
      <p>
        <strong>Height:</strong> {pokemon.height} decimeters
      </p>
      <p>
        <strong>Weight:</strong> {pokemon.weight} hectograms
      </p>
      <h3>Types:</h3>
      <ul>
        {pokemon.types.map((type, index) => (
          <li key={index}>{type.type.name}</li>
        ))}
      </ul>
      <h3>Abilities:</h3>
      <ul>
        {pokemon.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
}
