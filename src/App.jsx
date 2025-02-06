
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; 
import PokemonList from "./components/PokemonList"; 
import PokemonDetails from "./pages/PokemonDetails"; 
import PokemonRoster from "./pages/PokemonRoster"; 

import Header from "./components/Header";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Details from "./pages/Details";
import PokemonBattle from "./pages/PokemonBattle";


const App = () => {
  return (
    <Router>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/roster">My Roster</Link>
          </li>{" "}
         
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<PokemonList />} />{" "}
      
        <Route path="/pokemon/:name" element={<PokemonDetails />} />{" "}
       
        <Route path="/roster" element={<PokemonRoster />} />{" "}
      

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/details/:id" element={<Details />} /> */}
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/battle" element={<PokemonBattle />} />

      </Routes>
    </Router>
  );
};

export default App;
