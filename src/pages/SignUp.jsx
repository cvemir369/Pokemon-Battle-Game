import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

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
      console.log("Sign up successful:", response);
      setSuccess("Sign up successful! Redirecting to login...");
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
    <div className="max-w-sm mx-auto p-6 border rounded-lg shadow-lg mt-10 bg-white">
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
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Sign Up
        </button>
        <p>
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
