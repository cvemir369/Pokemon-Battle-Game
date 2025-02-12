import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import authService from "../services/authService";

const Header = () => {
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.removeItem("user");
      Cookies.remove("token"); // Use js-cookie to remove the token cookie
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
        <NavLink
          to="/roster"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-400 font-semibold py-2 px-4"
              : "text-black hover:text-gray-700 font-semibold py-2 px-4"
          }
        >
          My Roster
        </NavLink>
        <NavLink
          to="/battle"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-400 font-semibold py-2 px-4"
              : "text-black hover:text-gray-700 font-semibold py-2 px-4"
          }
        >
          Battle
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-400 font-semibold py-2 px-4"
              : "text-black hover:text-gray-700 font-semibold py-2 px-4"
          }
        >
          Leaderboard
        </NavLink>
      </nav>
      <div className="flex items-center gap-2">
        <Link to="/signup">
          <button className="bg-white hover:bg-yellow-400 border border-black text-black font-semibold text-md py-2 px-4 rounded-none cursor-pointer">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-black hover:bg-yellow-400 border border-black hover:text-black text-white font-semibold text-md py-2 px-4 rounded-none cursor-pointer">
            Log In
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="bg-black hover:bg-yellow-400 border border-black hover:text-black text-white font-semibold text-md py-2 px-4 rounded-none cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
