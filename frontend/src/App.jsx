import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Registration from "./components/Registration";
import SignIn from "./components/SignIn";
import TokenReaction from "./components/TokenReaction";
import TokenGenerator from "./components/TokenGenerator";
import MedicalHistory from "./components/MedicalHistory";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import NearbyHospitals from "./components/VideoChat/NearbyHospitals.jsx";
import { LoadScript } from "@react-google-maps/api";
import { API_URLS } from "./api";
// import TokenDetail from "./components/TokenDetail";

function App() {
  return (
    <AuthProvider>
      <LoadScript googleMapsApiKey={API_URLS.GOOGLE_MAP_API_KEY}>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-gray-100">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/token-reaction" element={<TokenReaction />} />
                <Route path="/token-generation" element={<TokenGenerator />} />
                <Route path="/medical-history" element={<MedicalHistory />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/adminLogin" element={<AdminLogin />} />
                <Route path="/hospital" element={<NearbyHospitals />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LoadScript>
    </AuthProvider>
  );
}

export default App;
