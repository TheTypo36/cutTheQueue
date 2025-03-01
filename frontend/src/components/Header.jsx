import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const handleSigOut = () => {
    signOut();
    navigate("/signin");
  };

  const handleFetchMedicalHistory = () => {
    navigate("/medical-history");
  };
  return (
    <header className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 fixed w-full top-0 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold">
          CutTheQueue
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleFetchMedicalHistory}
              >
                Medical History
              </button>
              <span className="font-semibold">
                {user.name ? `Welcome, ${user.name}` : ""}
              </span>
              <button
                onClick={handleSigOut}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/signin"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
