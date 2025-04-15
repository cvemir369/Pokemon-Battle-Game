import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // Clear any local storage data
      localStorage.removeItem("user");
      // Redirect to login page
      navigate("/login");
      toast.success(`Good bye, see you soon!`);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-white mx-4 sm:mx-10 text-black pt-2 pb-1 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
      <div className="flex items-center">
        <Link to={isAuthenticated ? "/" : "/login"}>
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 sm:h-14 w-auto object-cover"
          />
        </Link>
      </div>
      <nav className="flex items-center space-x-4 sm:space-x-8">
        {isAuthenticated && (
          <>
            <NavLink
              to="/roster"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-600 font-semibold py-2 px-2 sm:px-4 text-sm sm:text-base"
                  : "text-black hover:text-gray-700 font-semibold py-2 px-2 sm:px-4 text-sm sm:text-base"
              }
            >
              My Roster
            </NavLink>
            <NavLink
              to="/battle"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-600 font-semibold py-2 px-2 sm:px-4 text-sm sm:text-base"
                  : "text-black hover:text-gray-700 font-semibold py-2 px-2 sm:px-4 text-sm sm:text-base"
              }
            >
              Battle
            </NavLink>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-600 font-semibold py-2 px-2 sm:px-4 text-sm sm:text-base"
                  : "text-black hover:text-gray-700 font-semibold py-2 px-2 sm:px-4 text-sm sm:text-base"
              }
            >
              Leaderboard
            </NavLink>
          </>
        )}
      </nav>
      <div className="flex items-center gap-2">
        {!isAuthenticated ? (
          <>
            <Link to="/signup">
              <button className="bg-white hover:bg-yellow-400 border border-black text-black font-semibold text-sm sm:text-md py-2 px-3 sm:px-4 rounded-none cursor-pointer">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-black hover:bg-yellow-400 border border-black hover:text-black text-white font-semibold text-sm sm:text-md py-2 px-3 sm:px-4 rounded-none cursor-pointer">
                Log In
              </button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-semibold text-sm sm:text-base">
                {user?.score || 0} XP
              </span>
              <Link to="/profile">
                <img
                  src={user?.image || "/default.jpg"}
                  alt="User Avatar"
                  className="h-8 sm:h-10 w-8 sm:w-10 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              </Link>
              <span className="font-semibold text-sm sm:text-base">
                Hi, {user?.username}!
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-black hover:bg-yellow-400 border border-black hover:text-black text-white font-semibold text-sm sm:text-md py-2 px-3 sm:px-4 rounded-none cursor-pointer"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
