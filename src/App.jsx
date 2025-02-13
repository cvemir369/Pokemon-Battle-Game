import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./pages/PokemonDetails";
import PokemonRoster from "./pages/PokemonRoster";
import Leaderboard from "./pages/Leaderboard";
import PokemonBattle from "./pages/PokemonBattle";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import VerifyUsersEmail from "./pages/VerifyUsersEmail";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
          <Route
            path="/roster"
            element={<ProtectedRoute element={<PokemonRoster />} />}
          />

          <Route
            path="/battle"
            element={<ProtectedRoute element={<PokemonBattle />} />}
          />
          <Route
            path="/leaderboard"
            element={<ProtectedRoute element={<Leaderboard />} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify/:token" element={<VerifyUsersEmail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
