import React from "react";
import { useLocation, useNavigate } from "react-router";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMatchRoute = (route) => route === location.pathname;

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        {/* Logo */}
        <div>
          <img
            src="logo-brand.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Nav Links */}
        <ul className="flex space-x-10">
          <li
            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 
              border-b-[3px] border-b-transparent -mb-[3px] ${
                pathMatchRoute("/") && "text-black border-b-red-500"
              }`}
            onClick={() => navigate("/")}
          >
            Home
          </li>

          <li
            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 
              border-b-[3px] border-b-transparent -mb-[3px] ${
                pathMatchRoute("/offers") && "text-black border-b-red-500"
              }`}
            onClick={() => navigate("/offers")}
          >
            Offers
          </li>

          <li
            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 
              border-b-[3px] border-b-transparent -mb-[3px] ${
                pathMatchRoute("/sign-in") && "text-black border-b-red-500"
              }`}
            onClick={() => navigate("/sign-in")}
          >
            Sign in
          </li>
        </ul>
      </header>
    </nav>
  );
};

export default Navbar;
