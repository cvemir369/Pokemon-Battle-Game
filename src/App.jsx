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
import UserProfile from "./pages/UserProfile";

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
        />
        <Route path="/verify/:token" element={<VerifyUsersEmail />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/pokemon"
          element={isAuthenticated ? <PokemonList /> : <Navigate to="/login" />}
        />
        <Route
          path="/pokemon/:id"
          element={
            isAuthenticated ? <PokemonDetails /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/roster"
          element={
            isAuthenticated ? <PokemonRoster /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/battle"
          element={
            isAuthenticated ? <PokemonBattle /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/leaderboard"
          element={isAuthenticated ? <Leaderboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />}
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
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
