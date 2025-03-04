"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, Clock, Calendar, ArrowRight, Loader2 } from "lucide-react";

const TokenGenerator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const generateToken = () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowConfirmation(true);

      // Redirect after showing confirmation
      setTimeout(() => {
        navigate("/token-reaction");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 pb-10 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden animate-fade-in">
          {!showConfirmation ? (
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Ticket className="w-8 h-8 text-primary dark:text-primary-dark" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
                Token Generator
              </h2>
              <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
                Generate your queue token to secure your place in line
              </p>

              <div className="space-y-6 mb-8">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-gray-600 dark:text-gray-300 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Estimated Wait Time
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Current average wait time is approximately 25-30
                        minutes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-300 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Today's Schedule
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        The clinic is open until 5:00 PM today. Last token will
                        be generated at 4:30 PM.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={generateToken}
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-primary text-white hover:bg-primary-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Token...
                  </>
                ) : (
                  <>
                    Generate Patient Token
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>

              <div className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
                <p>
                  By generating a token, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Token Generated!
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your token has been successfully generated. Redirecting you to
                view your token details...
              </p>

              <div className="flex justify-center">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenGenerator;
