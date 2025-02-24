import React from "react";
import { useNavigate } from "react-router-dom";

const TokenGenerator = () => {
  const navigate = useNavigate();
  const generateToken = () => {
    navigate("/token-reaction");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Token Generator</h2>
        <p className="mb-4">
          Click the button below to generate an access token.
        </p>
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          onClick={generateToken}
        >
          Generate Access Token
        </button>
      </div>
    </div>
  );
};

export default TokenGenerator;
