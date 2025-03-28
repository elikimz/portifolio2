import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Contacts", path: "/contacts" },
    { name: "Skills", path: "/skill" },
    { name: "Blogs", path: "/blogs" },
  ];

  return (
    <nav className="bg-gray-900 text-gray-300 shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-8 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-white">
          MyPortfolio
        </Link>

        {/* Navigation Links (Hidden on mobile) */}
        <div className="hidden md:flex space-x-10">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-lg hover:text-blue-400 transition ${
                location.pathname === link.path ? "font-bold text-blue-400" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12" // X icon when menu is open
                    : "M4 6h16M4 12h16m-7 6h7" // Hamburger icon
                }
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="space-y-2 py-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)} // Close menu on link click
                className="block px-4 py-2 text-lg hover:text-gray-400 hover:bg-gray-700 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
