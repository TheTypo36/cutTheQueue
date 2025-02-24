"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { API_URLS } from "../api";
function TokenReaction() {
  const [patientTokenNumber, setPatientTokenNumber] = useState({});
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
        const gettingPatientTokenNumber = await axios.post(
          API_URLS.GET_PATIENTS_TOKEN,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(
          "patientTokenNumber in tokenReaction",
          gettingPatientTokenNumber
        );
        setPatientTokenNumber(gettingPatientTokenNumber.data.data);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTokens();
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Patient Details</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Name: {user?.name}</h3>
        </div>
        {patientTokenNumber ? (
          <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-2">
              Token No: {patientTokenNumber.token}
            </h3>
            <p className="text-gray-700 mb-1">
              Doctor: {patientTokenNumber.doctor}
            </p>
            <p className="text-gray-700">
              Department: {patientTokenNumber.department}
            </p>
          </div>
        ) : (
          <p className="text-gray-700 text-center">No tokens available</p>
        )}
      </div>
    </div>
  );
}

export default TokenReaction;
