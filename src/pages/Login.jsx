import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import authService from "../services/authService";
import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login, user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/check-session/${user._id}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.authenticated) {
          // setUser(response.data.user);
          navigate("/");
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };
    checkSession();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      const response = await authService.login(formData);
      // console.log("Login successful:", response);
      login(response.user); // Update the authentication state
      setUser(response.user); // Set the user object in context
      navigate("/"); // Redirect to the home page or any other page
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <section className="bg-yellow-400 min-h-screen mt-2 pt-8">
      <div className="max-w-sm mx-auto p-6 rounded-none shadow-lg mt-10 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 mb-3 border border-gray-400 rounded-none"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-400 rounded-none"
          />
          <button
            type="submit"
            className="w-full p-2 bg-black hover:bg-yellow-400 hover:text-black border border-black text-white font-semibold text-md py-2 px-4 rounded-none"
          >
            Login
          </button>
          <p className="mt-2 text-sm font-regular text-slate-600">
            Not registered?{" "}
            <Link
              to="/signup"
              className="hover:text-yellow-600 font-bold text-black"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
