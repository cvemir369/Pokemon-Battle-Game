import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import authService from "../services/authService";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Add this line
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    image: user?.image || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const updatedData = {};
      if (formData.username !== user.username)
        updatedData.username = formData.username;
      if (formData.email !== user.email) updatedData.email = formData.email;
      if (formData.image !== user.image) updatedData.image = formData.image;

      if (Object.keys(updatedData).length === 0) {
        setError("No changes to update");
        setIsLoading(false);
        return;
      }

      const updatedUser = await authService.updateUser(user._id, updatedData);
      setUser(updatedUser);
      setIsEditing(false);
      toast.success(`Profile updated!`);
    } catch (error) {
      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 pt-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-none shadow-lg">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-none">
            {error}
          </div>
        )}

        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <img
              src={user?.image || "/default.jpg"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>

          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-none"
                  placeholder="Username"
                  disabled={isLoading}
                />
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  className="w-full p-2 border border-gray-300 rounded-none"
                  placeholder="Email"
                  disabled={isLoading}
                />
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-none"
                  placeholder="Image URL"
                  disabled={isLoading}
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-black text-white px-4 py-2 rounded-none hover:bg-yellow-400 hover:text-black transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                    className="bg-gray-200 px-4 py-2 rounded-none hover:bg-gray-300 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h1 className="text-3xl font-bold">{user?.username}</h1>
                <p className="text-gray-600 mb-2">{user?.email}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-black text-white px-4 py-2 rounded-none hover:bg-yellow-400 hover:text-black transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-none">
            <h2 className="text-xl font-semibold mb-2">Experience</h2>
            <p className="text-gray-700">Total XP: {user?.score || 0}</p>
            <p className="text-gray-700">
              Level: {Math.floor((user?.score || 0) / 100) + 1}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-none">
            <h2 className="text-xl font-semibold mb-2">Battle Statistics</h2>
            <p className="text-gray-700">Wins: {user?.wins || 0}</p>
            <p className="text-gray-700">
              Losses: {(user?.gamesPlayed || 0) - (user?.losses || 0)}
            </p>
            <p className="text-gray-700">
              Games Played: {user?.gamesPlayed || 0}
            </p>
            <p className="text-gray-700">
              Win Rate:{" "}
              {user?.gamesPlayed
                ? ((user.wins / user.gamesPlayed) * 100).toFixed(1)
                : 0}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
