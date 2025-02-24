import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Registration from "./components/Registration";
import SignIn from "./components/SignIn";
import TokenReaction from "./components/TokenReaction";
import TokenGenerator from "./components/TokenGenerator";
// import TokenDetail from "./components/TokenDetail";

function App() {
  return (
    <AuthProvider>
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
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
