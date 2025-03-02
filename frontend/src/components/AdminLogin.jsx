import { useState } from "react";
import { API_URLS } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminSignIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hospitalName, setHospitalName] = useState("");

  const handleAdminSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        API_URLS.ADMIN_LOGIN,
        {
          email,
          password,
          hospitalName,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      adminSignIn(response.data.data.admin, response.data.data.token);
      navigate("/admin-dashboard");
      console.log("Login successful:", response.data);
    } catch (error) {
      navigate("/admin-dashboard");

      console.error("Login failed:", error);
    }
  };

  return (
    <div
      className="admin-login-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        className="admin-login-card"
        style={{
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "1.5rem", color: "#333" }}
        >
          Admin Sign In
        </h2>
        <form className="admin-login-form" onSubmit={handleAdminSignIn}>
          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="username"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              Admin Email:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="hospital"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#555",
              }}
            >
              Hospital:
            </label>
            <select
              id="hospital"
              name="hospital"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              required
              className="form-control"
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="AIIMS" defaultChecked>
                AIIMS
              </option>
              <option value="MAHAVEER">MAHAVEER</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
