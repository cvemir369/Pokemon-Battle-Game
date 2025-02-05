import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white mx-10 text-black pt-2 pb-1 flex justify-between items-center">
      <div className="flex itmes-cneter">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-14 w-auto object-cover"
          />
        </Link>
      </div>
      <nav className="flex items-center space-x-8">
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
      <div className="flex items-center">
        <button className="bg-black hover:bg-yellow-400 hover:text-black text-white font-bold py-2 px-4 rounded-none">
          Play
        </button>
      </div>
    </header>
  );
};
export default Header;
