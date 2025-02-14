import React, { createContext, useState, useContext, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUser = async (userData) => {
    if (!userData || !userData._id) {
      console.error("Invalid user data:", userData);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("user");
      return;
    }

    try {
      const freshUserData = await authService.getUser(userData._id);
      setUser(freshUserData);
      localStorage.setItem("user", JSON.stringify(freshUserData));
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Update user error:", error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser._id) {
            const freshUserData = await authService.getUser(parsedUser._id);
            setUser(freshUserData);
            setIsAuthenticated(true);
          } else {
            throw new Error("Invalid user data");
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (userData) => {
    if (!userData || !userData._id) {
      console.error("Invalid user data:", userData);
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      const freshUserData = await authService.getUser(userData._id);
      setUser(freshUserData);
      localStorage.setItem("user", JSON.stringify(freshUserData));
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
    user,
    setUser: updateUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
