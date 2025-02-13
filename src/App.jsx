import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./pages/PokemonDetails";
import PokemonRoster from "./pages/PokemonRoster";
import Leaderboard from "./pages/Leaderboard";
import PokemonBattle from "./pages/PokemonBattle";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import VerifyUsersEmail from "./pages/VerifyUsersEmail";

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/pokemon"
          element={isAuthenticated ? <PokemonList /> : <Navigate to="/auth" />}
        />
        <Route
          path="/pokemon/:id"
          element={
            isAuthenticated ? <PokemonDetails /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/roster"
          element={
            isAuthenticated ? <PokemonRoster /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/battle"
          element={
            isAuthenticated ? <PokemonBattle /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/leaderboard"
          element={isAuthenticated ? <Leaderboard /> : <Navigate to="/auth" />}
        />
        <Route path="/verify/:token" element={<VerifyUsersEmail />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
