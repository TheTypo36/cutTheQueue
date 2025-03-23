import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useEffect, useState } from "react";
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
import Dashboard from "./components/Dashboard";
import ChatBot from "./components/ChatBot";
// import TokenDetail from "./components/TokenDetail";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled in localStorage or system preference
    const isDarkMode = localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.theme = newMode ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', newMode);
  };

  // Helper function to determine if the current path should show the sidebar layout
  const isSidebarLayout = (pathname) => {
    return ['/dashboard', '/activity', '/settings'].includes(pathname);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-[#121212] transition-colors duration-300">
          <Routes>
            {/* Public routes with header and footer */}
            <Route path="/" element={
              <>
                <Header />
                <main className="pt-16">
                  <LandingPage />
                </main>
                <Footer />
              </>
            } />
            <Route path="/register" element={
              <>
                <Header />
                <main className="pt-16">
                  <Registration />
                </main>
                <Footer />
              </>
            } />
            <Route path="/signin" element={
              <>
                <Header />
                <main className="pt-16">
                  <SignIn />
                </main>
                <Footer />
              </>
            } />
            <Route path="/token-reaction" element={
              <>
                <Header />
                <main className="pt-16">
                  <TokenReaction />
                </main>
                <Footer />
              </>
            } />
            <Route path="/token-generation" element={
              <>
                <Header />
                <main className="pt-16">
                  <TokenGenerator />
                </main>
                <Footer />
              </>
            } />
            <Route path="/medical-history" element={
              <>
                <Header />
                <main className="pt-16">
                  <MedicalHistory />
                </main>
                <Footer />
              </>
            } />
            
            {/* Admin routes without header and footer */}
            <Route path="/admin-dashboard" element={
              <AdminDashboard isDark={isDark} toggleDarkMode={toggleDarkMode} />
            } />
            <Route path="/adminLogin" element={
              <>
                <Header />
                <main className="pt-16">
                  <AdminLogin />
                </main>
                <Footer />
              </>
            } />
            
            {/* Dashboard routes */}
            <Route path="/dashboard/*" element={
              <Dashboard isDark={isDark} toggleDarkMode={toggleDarkMode} />
            } />
          </Routes>
          <ChatBot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


