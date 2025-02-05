import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white mx-10 text-black p-1 flex justify-between items-center">
      <Link to="/">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-16 w-auto object-cover mr-4"
        />
      </Link>
      <nav className="flex-grow flex justify-center space-x-4">
        <Link
          to="/details"
          className="text-black hover:text-gray-700 font-semibold py-2 px-4"
        >
          Pokédex
        </Link>
        <Link
          to="/roster"
          className="text-black hover:text-gray-700 font-semibold py-2 px-4"
        >
          My Roster
        </Link>
        <Link
          to="/battle"
          className="text-black hover:text-gray-700 font-semibold py-2 px-4"
        >
          Battle
        </Link>
        <Link
          to="/leaderboard"
          className="text-black hover:text-gray-700 font-semibold py-2 px-4"
        >
          Leaderboard
        </Link>
      </nav>
      <button className="bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-none">
        Play
      </button>
    </header>
  );
};
export default Header;
