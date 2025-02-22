import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="m-0">CutTheQueue</h1>
      <button className="px-4 py-2 bg-blue-400 rounded hover:bg-blue-500">
        Sign In
      </button>
    </header>
  );
};

export default Header;
