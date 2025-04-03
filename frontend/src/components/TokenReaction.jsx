"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URLS } from "../api";
import { Ticket, User, Building, Clock, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TokenReaction() {
  const [patientTokenNumber, setPatientTokenNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    const fetchTokens = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          API_URLS.GET_PATIENTS_TOKEN,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setPatientTokenNumber(response.data.data);

        // Set a random estimated time for demo purposes
        const randomMinutes = Math.floor(Math.random() * 30) + 15;
        setTimeRemaining(randomMinutes);
      } catch (error) {
        console.error("Error fetching tokens:", error);
        toast.error("Failed to fetch token information");
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [user, navigate]);

  // Simulate decreasing time
  useEffect(() => {
    if (timeRemaining === null) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const getStatusColor = () => {
    if (!timeRemaining) return "text-green-500";
    if (timeRemaining < 10) return "text-green-500";
    if (timeRemaining < 20) return "text-yellow-500";
    return "text-red-500";
  };

  const getStatusText = () => {
    if (timeRemaining === 0) return "Ready to see doctor";
    if (timeRemaining < 10) return "Almost your turn";
    if (timeRemaining < 20) return "Getting closer";
    return "In queue";
  };

  return (
    <div className="min-h-screen pt-20 pb-10 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden animate-fade-in">
          {loading ? (
            <div className="p-8 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="text-gray-700 dark:text-gray-300">
                Loading token information...
              </p>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <h2 className="text-2xl font-bold mb-1">Patient Token</h2>
                <p className="text-white/90">Your queue information</p>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-primary dark:text-primary-dark" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-600 dark:text-gray-400">
                      Patient Name
                    </h3>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {user?.name || "Patient"}
                    </p>
                  </div>
                </div>

                {patientTokenNumber ? (
                  <>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <Ticket className="w-5 h-5 text-primary mr-2" />
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            Token Number
                          </h3>
                        </div>
                        <span className="text-2xl font-bold text-primary">
                          {patientTokenNumber?.token}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Doctor
                          </h4>
                          <p className="font-medium text-gray-900 dark:text-white flex items-center">
                            <User className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                            {patientTokenNumber?.doctor?.name ||
                              "Assigned Doctor"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Department
                          </h4>
                          <p className="font-medium text-gray-900 dark:text-white flex items-center">
                            <Building className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                            {patientTokenNumber?.department?.name || "General"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Hospital
                          </h4>
                          <p className="font-medium text-gray-900 dark:text-white flex items-center">
                            <Building className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                            {patientTokenNumber?.hospital?.name ||
                              "Aiims main Block"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                        Estimated Wait Time
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">
                            Status:
                          </span>
                          <span className={`font-medium ${getStatusColor()}`}>
                            {getStatusText()}
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full transition-all duration-1000"
                              style={{
                                width: `${
                                  100 -
                                  (timeRemaining
                                    ? (timeRemaining / 30) * 100
                                    : 0)
                                }%`,
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-600 dark:text-gray-400">
                            <span>In Queue</span>
                            <span>
                              {timeRemaining === 0
                                ? "Ready"
                                : `~${timeRemaining} min`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-300">
                      <p>
                        Please be ready when your token is called. If you miss
                        your turn, you may need to request a new token.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-4">
                      <svg
                        className="w-8 h-8 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No Active Token
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      You don't have an active token. Please generate a new
                      token.
                    </p>
                    <button
                      onClick={() => navigate("/token-generation")}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Generate Token
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TokenReaction;
