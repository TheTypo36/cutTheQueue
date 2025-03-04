"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../api";
import {
  Upload,
  User,
  Mail,
  Phone,
  Calendar,
  Building,
  Check,
  Loader2,
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

function Registration() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [formStep, setFormStep] = useState(1);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedicalHistory(file);
      setFileName(file.name);
    }
  };

  const validateStep1 = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!age) {
      toast.error("Age is required");
      return false;
    }
    if (!department.trim()) {
      toast.error("Department is required");
      return false;
    }
    if (!phoneNumber.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!medicalHistory) {
      toast.error("Medical history is required");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (formStep === 1 && validateStep1()) {
      setFormStep(2);
    } else if (formStep === 2 && validateStep2()) {
      setFormStep(3);
    }
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  // Separate handlers for each step
  const handleContinueClick = (e) => {
    e.preventDefault(); // Prevent any form submission
    e.stopPropagation(); // Stop event bubbling
    nextStep();
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep1() || !validateStep2() || !validateStep3()) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("age", age);
      formData.append("isNewPatient", isNewPatient);
      formData.append("department", department);
      formData.append("phoneNumber", phoneNumber);

      if (medicalHistory) {
        formData.append("medicalHistory", medicalHistory);
      }

      const response = await axios.post(API_URLS.REGISTER, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Registration successful! Please sign in.");
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderFormStep = () => {
    switch (formStep) {
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              Account Information
            </h3>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              Personal Details
            </h3>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Building className="w-5 h-5 text-gray-400" />
                </div>
                <select
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">Select Department</option>
                  <option value="cardio">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Oncology">Oncology</option>
                  <option value="General Medicine">General Medicine</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 py-2">
                <input
                  id="isNewPatient"
                  type="checkbox"
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  checked={isNewPatient}
                  onChange={(e) => setIsNewPatient(e.target.checked)}
                />
                <label
                  htmlFor="isNewPatient"
                  className="text-gray-700 dark:text-gray-300"
                >
                  I am a new patient
                </label>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              Medical History
            </h3>
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="medicalHistory"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />
                <label
                  htmlFor="medicalHistory"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    {fileName ? fileName : "Upload your medical history"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click to browse (PDF or Image)
                  </p>
                </label>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Uploading your medical history helps doctors provide better
                  care. Your data is secure and only accessible to authorized
                  healthcare providers.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Registration Summary
                </h4>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg space-y-2">
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Name:
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {name}
                    </span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Email:
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {email}
                    </span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Age:
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {age}
                    </span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Department:
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {department}
                    </span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Phone:
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {phoneNumber}
                    </span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      New Patient:
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {isNewPatient ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      formStep >= step
                        ? "bg-primary text-white"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {formStep > step ? <Check className="w-4 h-4" /> : step}
                  </div>
                  <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                    {step === 1
                      ? "Account"
                      : step === 2
                      ? "Details"
                      : "Medical"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-in-out"
                style={{ width: `${((formStep - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
              Patient Registration
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Join CutTheQueue to streamline your healthcare experience
            </p>

            {/* For steps 1 and 2, use div instead of form to avoid accidental submission */}
            {formStep < 3 ? (
              <div>
                {renderFormStep()}
                <div className="mt-8 flex justify-between">
                  {formStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleContinueClick}
                    className="ml-auto px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : (
              /* Only use an actual form for the final step */
              <form onSubmit={handleFinalSubmit}>
                {renderFormStep()}
                <div className="mt-8 flex justify-between">
                  {formStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="ml-auto px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors disabled:opacity-70 flex items-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
          Already have an account?{" "}
          <a href="/signin" className="text-primary hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Registration;
