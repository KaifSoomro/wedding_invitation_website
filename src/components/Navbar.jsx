import React from "react";
import { NavLink } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import "../index.css";
import {
  RouteContact,
  RouteHome,
  RoutePremium,
  RoutePricing,
  RouteTemplate,
} from "@/helpers/RouteNames";

const Navbar = () => {
  return (
    <nav className="w-full h-15 md:h-17 lg:h-20 flex items-center justify-between px-4 fixed top-0 border border-b bg-white z-50 lg:px-20">
      <h1 className="text-2xl text_font">Wedding Cards.</h1>
      <div className="hidden lg:flex items-center justify-center gap-3">
        <NavLink
          to={RouteHome}
          className={({ isActive }) =>
            `text-lg font-semibold px-6 py-2 rounded-lg hover:bg-violet-100 hover:transition-all ${
              isActive ? "bg-violet-100" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to={RouteTemplate}
          className={({ isActive }) =>
            `text-lg font-semibold px-6 py-2 rounded-lg hover:bg-violet-100 hover:transition-all ${
              isActive ? "bg-violet-100" : ""
            }`
          }
        >
          Templates
        </NavLink>
        <NavLink
          to={RoutePremium}
          className={({ isActive }) =>
            `text-lg font-semibold px-6 py-2 rounded-lg hover:bg-violet-100 hover:transition-all ${
              isActive ? "bg-violet-100" : ""
            }`
          }
        >
          Premium
        </NavLink>
        {/* <NavLink
          to={RouteEditor}
          className={({ isActive }) =>
            `text-lg font-semibold px-6 py-2 rounded-lg hover:bg-violet-100 hover:transition-all ${
              isActive ? "bg-violet-100" : ""
            }`
          }
        >
          Customize
        </NavLink> */}
        <NavLink
          to={RouteContact}
          className={({ isActive }) =>
            `text-lg font-semibold px-6 py-2 rounded-lg hover:bg-violet-100 transition-all ${
              isActive ? "bg-violet-100" : ""
            }`
          }
        >
          Contact
        </NavLink>
      </div>
      <button className="block md:text-5xl lg:hidden">
        <HiBars3 className="text-4xl" />
      </button>
    </nav>
  );
};

export default Navbar;
