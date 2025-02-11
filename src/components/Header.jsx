import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white mx-10 text-black pt-2 pb-1 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-14 w-auto object-cover"
          />
        </Link>
      </div>
      <nav className="flex items-center space-x-8">
        {/* <Link
          to="/details"
          className="text-black hover:text-gray-700 font-semibold py-2 px-4"
        >
          Pokédex
        </Link> */}
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
      <div className="flex items-center gap-2">
        <Link to="/signup">
          <button className="bg-white hover:bg-yellow-400 border border-black text-black font-semibold text-md py-2 px-4 rounded-none">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-black hover:bg-yellow-400 border border-black hover:text-black text-white font-semibold text-md py-2 px-4 rounded-none">
            Log In
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
