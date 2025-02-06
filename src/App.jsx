import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Для маршрутизации
import PokemonList from "./components/PokemonList"; // Компонент списка покемонов
import PokemonDetails from "./pages/PokemonDetails"; // Компонент для подробностей покемона (страница)
import PokemonRoster from "./pages/PokemonRoster"; // Компонент для ростера покемонов (страница)

function App() {
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
          {/* Ссылка на страницу ростера */}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<PokemonList />} />{" "}
        {/* Главная страница с Pokémon List */}
        <Route path="/pokemon/:name" element={<PokemonDetails />} />{" "}
        {/* Страница с деталями покемона */}
        <Route path="/roster" element={<PokemonRoster />} />{" "}
        {/* Страница с ростером покемонов */}
      </Routes>
    </Router>
  );
}

export default App;
