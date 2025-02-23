"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { API_URLS } from "../api";
function TokenReaction() {
  const [tokens, setTokens] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    const fetchTokens = async () => {
      try {
        const { token } = location.state.tokenData;
        console.log(token);
        setTokens(token);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTokens();
  }, [user, navigate]);

  return (
    <div>
      <h2 className="text-xl font-bold">Patient Name: {user?.name}</h2>
      {tokens ? (
        <div className="p-4 mb-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold">
            Token No: {location.state.tokenData.token}
          </h2>
          <p className="text-gray-700">
            Doctor: {location.state.tokenData.doctor}
          </p>
          <p className="text-gray-700">
            Department: {location.state.tokenData.department}
          </p>
        </div>
      ) : (
        <p className="text-gray-700">No tokens available</p>
      )}
    </div>
  );
}

export default TokenReaction;
