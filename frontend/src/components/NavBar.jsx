import React, { useState } from "react";
import { FaBars, FaLanguage } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import img from "../assets/logo.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img src={img} alt="Logo" className="w-20" />
            <span className="ml-4 text-gray-400 text-sm">
              {location.pathname}
            </span>
          </div>
          <div className="hidden md:flex space-x-6">
            <button className="hover:text-gray-300">Help</button>
            <div className="relative">
              <select className="bg-transparent border border-gray-700 text-white pr-8">
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
              <FaLanguage className="absolute right-2 top-1/2 transform -translate-y-1/2" />
            </div>
            <button className="hover:text-red-500">Logout</button>
          </div>
          <button onClick={toggleMenu} className="md:hidden">
            <FaBars className="w-6 h-6" />
          </button>
        </div>
        {isOpen && (
          <div className="mt-8 md:hidden">
            <button className="block mb-4 hover:text-gray-300">Help</button>
            <div className="relative mb-4">
              <select className="bg-transparent border border-gray-700 text-white pr-8">
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
              <FaLanguage className="absolute right-2 top-1/2 transform -translate-y-1/2" />
            </div>
            <button className="hover:text-red-500">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
