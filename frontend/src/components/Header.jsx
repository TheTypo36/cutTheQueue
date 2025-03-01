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
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          CutTheQueue
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              {user ? (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleFetchMedicalHistory}
                >
                  medicalHistory
                </button>
              ) : (
                ""
              )}
              <span>
                {user.name === undefined ? " " : "Welcome,"} {user.name}
              </span>
              {/* <Link to="/token-reaction" className="hover:underline">
                Tokens
              </Link> */}
              <button
                onClick={handleSigOut}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/signin" className="hover:underline">
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
