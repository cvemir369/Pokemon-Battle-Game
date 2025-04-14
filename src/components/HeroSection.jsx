import React, { useState, useCallback } from "react";
import debounce from "lodash/debounce";

const HeroSection = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.length >= 2) {
        onSearch(query);
      }
    }, 1000),
    [onSearch]
  );

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    debouncedSearch(value);
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
          onSubmit={(e) => e.preventDefault()}
          className="flex justify-center items-center gap-4"
        >
          <input
            type="text"
            placeholder="Find your Pokémon"
            value={searchQuery}
            onChange={handleInputChange}
            className="p-2 bg-white border border-gray-400 rounded-none w-64"
          />
          <button
            type="submit"
            className="bg-white hover:bg-yellow-400 border border-black text-black font-semibold text-md py-2 px-4 rounded-none hover:cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
