"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URLS } from "../api";
function TokenReaction() {
  const [tokens, setTokens] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    const fetchTokens = async () => {
      try {
        const response = await axios.POST(API_URLS.GET_PATIENTS_TOKEN);
        setTokens(response.data);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTokens();
  }, [user, navigate]);

  return (
    <div>
      {tokens.length > 0 ? (
        tokens.map((token) => (
          <div key={token.id} className="p-4 mb-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold">Token No: {token.tokenNumber}</h2>
            <p className="text-gray-700">Doctor: {token.doctor}</p>
            <p className="text-gray-700">Department: {token.department}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-700">No tokens available</p>
      )}
    </div>
  );
}

export default TokenReaction;
