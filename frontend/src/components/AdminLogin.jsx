import { useState } from "react";
import { API_URLS } from "../api";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hospitalName, setHospitalName] = useState("");

  const handleAdminSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(API_URLS.ADMIN_LOGIN, {
        email,
        password,
        hospital: hospitalName,
      });
      AdminLogin(response.data.data.admin, response.data.data.token);
      navigate("/admin-dashboard");
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Sign In</h2>
      <form className="admin-login-form" onSubmit={handleAdminSignIn}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={email}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="hospital">Hospital:</label>
          <select
            id="hospital"
            name="hospital"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            required
            className="form-control"
          >
            <option value="AIIMS">AIIMS</option>
            <option value="MAHAVEER">MAHAVEER</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
};
