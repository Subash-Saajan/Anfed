import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#1a2f12] to-[#0f1b0a] text-white mt-8">
      {/* Top decorative border */}
      <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="ANFED Logo" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                    ANFED
                  </h3>
                  <p className="text-xs text-green-400">Farmer Producer Company</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 max-w-xs">
                Empowering farmers through collective strength, sustainable practices, and direct market access.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/anfedfpo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/anfedfpo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.645.07 4.849 0 3.205-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@ANUMAN.NATHI.FED.FPCL-dp3xs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links & Services Row */}
            <div className="grid grid-cols-2 gap-8 sm:col-span-2 lg:col-span-2 lg:grid-cols-2">
              {/* Quick Links */}
              <div>
                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-green-500 rounded-full"></span>
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  {[
                    { name: "Home", path: "/" },
                    { name: "About Us", path: "/about" },
                    { name: "Services", path: "/services" },
                    { name: "Events", path: "/events" },
                    { name: "Gallery", path: "/gallery" },
                  ].map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-sm text-gray-300 hover:text-green-400 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-green-500 rounded-full"></span>
                  Services
                </h4>
                <ul className="space-y-2">
                  {[
                    "ANFED Mart",
                    "Training",
                    "Market Links",
                    "Value Addition",
                    "Outreach",
                  ].map((service) => (
                    <li key={service}>
                      <span className="text-sm text-gray-300">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-green-500 rounded-full"></span>
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    9/56 C, ISRO Road,<br />
                    Kavalkinaru Junction,<br />
                    Tirunelveli - 627105
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+917825879084" className="text-sm text-gray-300 hover:text-green-400 transition-colors">
                    +91 78258 79084
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:contact@anfed.com" className="text-sm text-gray-300 hover:text-green-400 transition-colors">
                    contact@anfed.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400 text-center sm:text-left">
              © {currentYear} Anuman Nadhi Fed Producer Company Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <Link to="/contact" className="hover:text-green-400 transition-colors">
                Contact
              </Link>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="flex items-center gap-1">
                Made with
                <svg className="w-3 h-3 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                for farmers
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
