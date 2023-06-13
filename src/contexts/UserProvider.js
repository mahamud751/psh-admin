import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Store the user and token in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }, [user, token]);

  const loginUser = async (email, password) => {
    try {
      // Make your API call here to login the user using Axios
      const response = await axios.post(
        "http://localhost:5001/api/users/login",
        { email, password }
      );

      if (response.status === 200) {
        const { data } = response;
        setUser(data.user);
        setToken(data.token);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logoutUser = () => {
    // Clear user and token from state and localStorage
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  // const isAuthenticated = () => {
  //   return token !== null && user !== null;
  // };
  // Provide the user and token to the components
  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, logoutUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
