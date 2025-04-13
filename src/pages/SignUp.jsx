import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await authService.signUp({
        username,
        email,
        password,
      });
      // console.log("Sign up successful:", response);
      setSuccess("Sign up successful! Redirecting to login...");
      toast.success(
        `Sign up successful, ${username}! Please, verify your email now.`
      );
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Sign up error:", error);
      setError("Sign up failed. Please try again.");
    }
  };

  return (
    <section className="bg-yellow-400 min-h-screen mt-2 pt-8">
      <div className="max-w-sm mx-auto p-6 border rounded-none shadow-lg mt-10 bg-white">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="w-full p-2 mb-3 border border-gray-400 rounded-none"
          />
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
            className="w-full p-2 mb-3 border border-gray-400 rounded-none"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className="w-full p-2 mb-4 border border-gray-400 rounded-none"
          />
          <button
            type="submit"
            className="w-full p-2 bg-black hover:bg-yellow-400 hover:text-black border border-black text-white font-semibold text-md py-2 px-4 rounded-none"
          >
            Sign Up
          </button>
          <p className="mt-2 text-sm font-regular text-slate-600">
            Already registered?{" "}
            <Link
              to="/login"
              className="hover:text-yellow-600 font-bold text-black"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
