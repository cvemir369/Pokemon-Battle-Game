// import React, { createContext, useState, useEffect } from "react";
// // import pokemonService from "../services/pokemonService.js";
// import { getPokemons } from "../services/pokeapi.js";

// export const PokemonContext = createContext();

// export const PokemonProvider = ({ children }) => {
//   const [pokemons, setPokemons] = useState([]);

//   useEffect(() => {
//     const fetchPokemons = async () => {
//       try {
//         const pokemons = await getPokemons();
//         setPokemons(pokemons);
//       } catch (error) {
//         console.error("Error fetching all pokemons:", error);
//       }
//     };

//     fetchPokemons();
//   }, []);

//   return (
//     <PokemonContext.Provider value={{ pokemons }}>
//       {children}
//     </PokemonContext.Provider>
//   );
// };
