"use client";
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { API_URLS } from "../api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const handleLogout = async () => {
    try {
      await axios.post(API_URLS.LOGOUT);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUser({ username });
    }
  }, []);

  const signIn = (patient, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", patient.name);
    setUser(patient);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    handleLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
