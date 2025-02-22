import React from "react";

const Footer = () => {
  return (
    <footer
      style={{ textAlign: "center", padding: "1em 0", background: "#f1f1f1" }}
    >
      <p>&copy; {new Date().getFullYear()} CutTheQueue. All rights reserved.</p>
      <p>Developed by Ashish Raghuvanshi</p>
    </footer>
  );
};

export default Footer;
