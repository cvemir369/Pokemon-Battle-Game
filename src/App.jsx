import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
// import Details from "./pages/Details";
import PokemonBattle from "./pages/PokemonBattle";

const App = () => {
  return (
    <Router>
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
