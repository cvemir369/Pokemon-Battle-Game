import React, { useState } from "react";

const HeroSection = ({ onSubmit }) => {
  const [username, setUsername] = useState("");

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    onSubmit(username);
  };

  return (
    <section className="hero bg-yellow-400 p-8 text-center">
      <img
        src="/pokeball.png"
        alt="Hero"
        className="h-32 w-auto mx-auto mb-8"
      />
      <h1 className="text-4xl font-bold mb-8">Pokémon: Battle Game</h1>
      <div>
        <form
          onSubmit={handleUsernameSubmit}
          className="flex justify-center items-center gap-4"
        >
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 bg-white border border-gray-400 rounded-non w-64"
          />
          <button
            type="submit"
            className="bg-white hover:bg-yellow-100 border border-black text-black font-bold py-2 px-4 rounded-non"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
