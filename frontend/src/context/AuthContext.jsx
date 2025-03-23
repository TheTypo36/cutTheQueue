"use client";
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { API_URLS } from "../api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Check for existing auth state
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const adminData = localStorage.getItem("admin");

    if (token && username) {
      setUser({ name: username });
    }
    if (token && adminData) {
      setAdmin(JSON.parse(adminData));
    }
  }, []);

  const adminSignIn = (admin, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(admin));
    setAdmin(admin);
  };

  const signIn = (patient, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", patient.name);
    setUser(patient);
  };

  const signOut = async () => {
    try {
      await axios.post(API_URLS.LOGOUT, {}, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setUser(null);
    }
  };

  const adminSignOut = async () => {
    try {
      await axios.post(API_URLS.ADMIN_LOGOUT, {}, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Admin logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      setAdmin(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        signIn,
        signOut,
        adminSignIn,
        adminSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
