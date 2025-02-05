import React from "react";
import HeroSection from "../components/HeroSection";
import PokemonGrid from "../components/PokemonGrid.jsx";

const Home = () => {
  const handleUsernameSubmit = (username) => {
    console.log("Username submitted:", username);
  };

  return (
    <div className="bg-yellow-400 min-h-screen mt-2 pt-8">
      <HeroSection onSubmit={handleUsernameSubmit} />
      <PokemonGrid />
    </div>
  );
};

export default Home;
