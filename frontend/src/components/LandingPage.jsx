import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">
        Welcome to CutTheQueue, Created on <b>FOSSHack 2025 </b> via Team{" "}
        <b>CoffeeCoder</b>
      </h1>
      <nav className="space-x-4">
        <Link
          to="/register"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </Link>
        <Link
          to="/signin"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </Link>
      </nav>
    </div>
  );
}

export default LandingPage;
