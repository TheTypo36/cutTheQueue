"use client";

import { useEffect, useState } from "react";
import { API_URLS } from "../api";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FileText, Download, Loader2, ZoomIn, ZoomOut } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const MedicalHistory = () => {
  const [medicalHistory, setMedicalHistory] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Unauthorized: No token found");
          throw new Error("Not authorized, no token");
        }

        const response = await axios.post(
          API_URLS.GET_PATIENTS_MEDICAL_HISTORY,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response) {
          toast.error("Failed to fetch medical records");
          throw new Error("Failed to fetch medical records");
        }

        setMedicalHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching medical history:", error);
        toast.error("Failed to retrieve medical history");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecord();
  }, []);

  const handleZoomIn = () => {
    if (zoomLevel < 2) {
      setZoomLevel((prev) => prev + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel((prev) => prev - 0.1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const downloadImage = () => {
    if (!medicalHistory) return;

    const link = document.createElement("a");
    link.href = medicalHistory;
    link.download = "medical-history.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`pt-20 pb-10 ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-black flex items-center justify-center"
          : "min-h-screen"
      }`}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div
        className={`container mx-auto px-4 ${
          isFullscreen ? "h-full flex flex-col" : ""
        }`}
      >
        <div
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden ${
            isFullscreen ? "flex-1 flex flex-col" : ""
          }`}
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-primary mr-2" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Medical History
              </h2>
            </div>

            {medicalHistory && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleZoomOut}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Toggle fullscreen"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isFullscreen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                      />
                    )}
                  </svg>
                </button>
                <button
                  onClick={downloadImage}
                  className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
                  aria-label="Download"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <div
            className={`p-6 ${
              isFullscreen ? "flex-1 flex items-center justify-center" : ""
            }`}
          >
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Loading medical records...
                </p>
              </div>
            ) : medicalHistory ? (
              <div className="flex justify-center">
                <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl max-w-full">
                  <img
                    src={medicalHistory || "/placeholder.svg"}
                    alt="Medical History"
                    className="max-w-full transition-transform duration-300"
                    style={{ transform: `scale(${zoomLevel})` }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Records Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  You don't have any medical records uploaded yet. Please
                  contact your healthcare provider to add your medical history.
                </p>
              </div>
            )}
          </div>

          {medicalHistory && !isFullscreen && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This medical history was last updated on{" "}
                {new Date().toLocaleDateString()}. For any updates, please
                contact your healthcare provider.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
