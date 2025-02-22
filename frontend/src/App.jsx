import { useState } from "react";
import Header from "./components/Header.jsx";
import TokenGenerator from "./components/TokenGenerator.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

function App() {
  return (
    <div className="">
      <Header />
      <TokenGenerator />
      <Footer />
    </div>
  );
}

export default App;
