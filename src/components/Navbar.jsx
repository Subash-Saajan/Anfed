import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import Logo from "../assets/Logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navbarRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);

  linksRef.current = [];
  mobileLinksRef.current = [];

  const addLinkRef = (el) => {
    if (el && !linksRef.current.includes(el)) linksRef.current.push(el);
  };

  const addMobileLinkRef = (el) => {
    if (el && !mobileLinksRef.current.includes(el)) mobileLinksRef.current.push(el);
  };

  const linkClass = ({ isActive }) =>
    `inline-block transform-gpu transition duration-300 ease-out hover:scale-110 text-gray-700 hover:text-[#448800] font-medium ${
      isActive ? "text-[#448800]" : ""
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 ${
      isActive
        ? "bg-green-500/20 text-green-700"
        : "text-gray-700 hover:bg-white/50 hover:text-green-600"
    }`;

  // GSAP Animation for desktop
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

  // Mobile menu animation
  useEffect(() => {
    if (open && mobileMenuRef.current) {
      // Animate menu in
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      // Animate links staggered
      gsap.fromTo(
        mobileLinksRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", delay: 0.1 }
      );
    }
  }, [open]);

  // Close menu on route change
  const handleLinkClick = () => {
    setOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Events", path: "/events" },
    { name: "Farmers", path: "/farmers" },
    { name: "Gallery", path: "/gallery" },
    { name: "Mart", path: "/mart" },
  ];

  return (
    <>
      <header
        ref={navbarRef}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
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
            {navLinks.slice(0, 5).map((link) => (
              <span key={link.path} ref={addLinkRef}>
                <NavLink to={link.path} className={linkClass} end={link.path === "/"}>
                  {link.name}
                </NavLink>
              </span>
            ))}
          </nav>

          {/* Contact + Hamburger */}
          <div className="flex items-center gap-3">
            <NavLink
              to="/contact"
              ref={contactRef}
              className="bg-gradient-to-r from-green-500 to-emerald-600 font-semibold rounded-full transform-gpu transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg active:scale-100 focus:outline-none px-4 py-2 text-white text-center"
            >
              Contact
            </NavLink>

            {/* Hamburger Button */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 relative z-50"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-6 bg-gray-700 rounded-full transform transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 w-6 bg-gray-700 rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-0' : ''}`} />
                <span className={`block h-0.5 w-6 bg-gray-700 rounded-full transform transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Menu Panel */}
          <div
            ref={mobileMenuRef}
            className="fixed top-16 left-4 right-4 z-50 md:hidden"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
              {/* Menu Content */}
              <nav className="p-4 space-y-1">
                {navLinks.map((link, index) => (
                  <div key={link.path} ref={addMobileLinkRef}>
                    <NavLink
                      to={link.path}
                      className={mobileLinkClass}
                      end={link.path === "/"}
                      onClick={handleLinkClick}
                    >
                      <span className="flex items-center gap-3">
                        {link.name}
                      </span>
                    </NavLink>
                  </div>
                ))}
              </nav>

            </div>
          </div>
        </>
      )}
    </>
  );
}
