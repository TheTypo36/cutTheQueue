import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x">
      <h1 className="text-5xl font-extrabold mb-8 text-white drop-shadow-lg animate-fade-in">
        Welcome to CutTheQueue, Created on <b>Verge❌SRM BUILDS 6.O 2025</b> via
        Team <b>CoffeeCoder</b>
      </h1>
      <nav className="space-x-4">
        <Link
          to="/register"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transform transition-transform duration-300 hover:scale-110"
        >
          Register
        </Link>
        <Link
          to="/signin"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transform transition-transform duration-300 hover:scale-110"
        >
          Sign In
        </Link>
      </nav>
    </div>
  );
}

export default LandingPage;
