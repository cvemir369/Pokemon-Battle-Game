import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-4" />
        <nav className="flex space-x-4">
          <Link
            to="/details"
            className="bg-transparent hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded"
          >
            Details Page
          </Link>
          <Link
            to="/roster"
            className="bg-transparent hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded"
          >
            Roster Page
          </Link>
          <Link
            to="/battle"
            className="bg-transparent hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded"
          >
            Battle Page
          </Link>
          <Link
            to="/leaderboard"
            className="bg-transparent hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded"
          >
            Leaderboard Page
          </Link>
        </nav>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Call to Action
      </button>
    </header>
  );
};

export default Header;
