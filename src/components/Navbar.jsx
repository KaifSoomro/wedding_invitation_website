import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { X } from "lucide-react";
import "../index.css";
import {
  RouteContact,
  RouteHome,
  RoutePricing,
  RouteTemplate,
  RouteEditor,
} from "@/helpers/RouteNames";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: RouteHome, label: "Home" },
    { to: RouteTemplate, label: "Templates" },
    { to: RoutePricing, label: "Pricing" },
    { to: RouteContact, label: "Contact" },
  ];

  return (
    <nav className="w-full h-15 md:h-17 lg:h-20 flex items-center justify-between px-4 fixed top-0 border border-b bg-white/95 backdrop-blur-sm z-50 lg:px-20 shadow-sm">
      <NavLink to={RouteHome} className="text-2xl text_font font-bold text-violet-600">
        Wedding Cards.
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center justify-center gap-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `text-lg font-semibold px-6 py-2 rounded-lg hover:bg-violet-100 transition-all ${
                isActive ? "bg-violet-100 text-violet-700" : "text-gray-700"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <NavLink
          to={RouteEditor}
          className="ml-2 px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
        >
          Create Design
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="block lg:hidden text-4xl text-gray-700 hover:text-violet-600 transition-colors"
      >
        {mobileMenuOpen ? <X /> : <HiBars3 />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg lg:hidden">
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-semibold px-4 py-3 rounded-lg hover:bg-violet-100 transition-all ${
                    isActive ? "bg-violet-100 text-violet-700" : "text-gray-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to={RouteEditor}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all text-center"
            >
              Create Design
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
