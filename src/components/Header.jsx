import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 py-4 text-center">
      <Link to="/" className="text-white text-2xl font-semibold">
        vnote.gg
      </Link>
    </header>
  );
};

export default Header;
