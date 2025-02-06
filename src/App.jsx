import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./pages/PokemonDetails";
import PokemonRoster from "./pages/PokemonRoster";

import Header from "./components/Header";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import PokemonBattle from "./pages/PokemonBattle";

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="/roster" element={<PokemonRoster />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/battle" element={<PokemonBattle />} />
      </Routes>
    </Router>
  );
};

export default App;
