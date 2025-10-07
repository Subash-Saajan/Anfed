import React, { useState, useLayoutEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import Logo from "../assets/Logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navbarRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);

  linksRef.current = [];
  const addLinkRef = (el) => {
    if (el && !linksRef.current.includes(el)) linksRef.current.push(el);
  };

  const linkClass = ({ isActive }) =>
    `inline-block transform-gpu transition duration-300 ease-out hover:scale-110 text-gray-700 hover:text-[#448800] font-medium ${
      isActive ? "text-[#448800]" : ""
    }`;

  // GSAP Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

      tl.from(".nav-logo", { y: -20, opacity: 0, duration: 0.8 })
        .from(".nav-name", { y: -20, opacity: 0, duration: 0.6 }, "-=0.6")
        .from(linksRef.current, { y: -15, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.3")
        .from(contactRef.current, { scale: 0.9, opacity: 0, duration: 0.6 }, "-=0.4");
    }, navbarRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={navbarRef}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-300"
    >
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
        {/* Logo + Name */}
        <div className="flex items-center gap-2 ml-4 h-12 md:h-14">
          <NavLink to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight">
            <img src={Logo} alt="Anfed" className="nav-logo h-8 md:h-10 w-auto object-contain" />
            <span className="nav-name text-lg md:text-xl font-semibold tracking-wider text-gray-800">
              ANFED
            </span>
          </NavLink>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center justify-center gap-6">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Events", path: "/events" },
            { name: "Farmers", path: "/farmers" },
          ].map((link) => (
            <span key={link.path} ref={addLinkRef}>
              <NavLink to={link.path} className={linkClass} end={link.path === "/"}>
                {link.name}
              </NavLink>
            </span>
          ))}
        </nav>

        {/* Contact + Hamburger */}
        <div className="flex items-center gap-3">
          <button
            ref={contactRef}
            className="bg-[#448800] font-bold rounded-full transform-gpu transition-transform duration-300 ease-out hover:scale-105 active:scale-100 focus:outline-none px-4 py-2 text-white text-center"
          >
            Contact
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-md hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-slate-700"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 overflow-hidden">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
            {["About", "Portfolio", "Services", "Events", "Contact"].map((link) => (
              <NavLink key={link} to={`/${link.toLowerCase()}`} className={linkClass}>
                {link}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
