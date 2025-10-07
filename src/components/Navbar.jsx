import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `inline-block transform-gpu transition duration-300 ease-out hover:scale-110 text-gray-700 hover:text-[#448800] font-medium ${
      isActive ? "text-[#448800]" : ""
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center">
        <div className="items-center justify-center ml-4 h-12 md:h-14">
          <NavLink
            to="/"
            className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <img
              src={Logo}
              alt="Anfed"
              className="h-8 md:h-10 items-center w-auto object-contain md:scale-110"
            />
            <span className="text-lg md:text-xl font-semibold tracking-wider text-gray-800">
              ANFED
            </span>
          </NavLink>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <nav className="space-x-6">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/services" className={linkClass}>
              Services
            </NavLink>
            <NavLink to="/events" className={linkClass}>
              Events
            </NavLink>
            <NavLink to="/farmers" className={linkClass}>
              Farmers
            </NavLink>
          </nav>
        </div>

        <div className="flex justify-end ml-8">
          <NavLink
            to="/contact"
            className="bg-[#448800] font-bold rounded-full transform-gpu transition-transform duration-300 ease-out hover:scale-105 active:scale-100 focus:outline-none px-4 py-2 text-white text-center">
            Contact
          </NavLink>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-md hover:bg-slate-100 ml-3"
            aria-label="Toggle menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-slate-700">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/portfolio" className={linkClass}>
              Portfolio
            </NavLink>
            <NavLink to="/services" className={linkClass}>
              Services
            </NavLink>
            <NavLink to="/events" className={linkClass}>
              Events
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
