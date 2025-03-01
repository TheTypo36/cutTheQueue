"use client";
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { API_URLS } from "../api.js";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleAdminLogout = async () => {
    try {
      console.log("admin token at logout", localStorage.getItem("token"));
      await axios.post(
        API_URLS.ADMIN_LOGOUT,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token from localStorage if used
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      setUser(null);
    } catch (error) {
      console.error("Admin logout error:", error);
    }
  };
  const handleLogout = async () => {
    try {
      console.log("token at logout", localStorage.getItem("token"));
      await axios.post(
        API_URLS.LOGOUT,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token from localStorage if used
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setUser(null);
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

  const adminSignIn = (admin, token) => {
    console.log("admin token at signIn", token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", admin.name);
    setAdmin(admin);
  };
  const signIn = (patient, token) => {
    console.log("token at sigIn", token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", patient.name);
    setUser(patient);
  };

  const signOut = async () => {
    await handleLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  const adminSignOut = async () => {
    await handleAdminLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, adminSignIn, adminSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
