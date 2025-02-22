import React, { useState } from "react";

const TokenGenerator = () => {
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    symptoms: "",
  });
  const [token, setToken] = useState("");

  const generateToken = () => {
    const tokenString = `${patientData.name}-${
      patientData.age
    }-${new Date().getTime()}`;
    setToken(tokenString);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Token Generator</h1>
      <input
        type="text"
        name="name"
        placeholder="Patient Name"
        value={patientData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="age"
        placeholder="Patient Age"
        value={patientData.age}
        onChange={handleChange}
      />
      <input
        type="text"
        name="symptoms"
        placeholder="Symptoms"
        value={patientData.symptoms}
        onChange={handleChange}
      />
      <button onClick={generateToken}>Generate Token</button>
      {token && <p>Generated Token: {token}</p>}
    </div>
  );
};

export default TokenGenerator;
