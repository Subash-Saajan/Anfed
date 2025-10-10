import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0f1b0a] text-white rounded-t-[36px] mt-5">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Left column: Company name */}
          <div className="flex flex-col">
            <h3 className="text-lg sm:text-xl font-extrabold leading-tight text-[#eef7ea]">
              Anuman Nadhi Fed
              <br />
              Producer Company Ltd{" "}
              <svg
                className="inline w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </h3>
          </div>

          {/* Middle column: Quick links */}
          <div className="flex flex-col items-start sm:items-center">
            <h4 className="text-sm font-bold mb-3 text-[#e6f0e6]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[#d6e9d6]">
              <li>
                <a href="/about" className="hover:font-bold">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:font-bold">
                  Contact
                </a>
              </li>
              <li>
                <a href="/services" className="hover:font-bold">
                  Services
                </a>
              </li>
              <li>
                <a href="/programs" className="hover:font-bold">
                  Programs
                </a>
              </li>
            </ul>
          </div>

          {/* Right column: Reach us on */}
          <div className="flex flex-col items-start sm:items-end">
            <h4 className="text-sm font-bold mb-3 text-[#e6f0e6] sm:text-right">
              Reach us on
            </h4>
            <p className="text-sm text-[#d6e9d6] leading-relaxed sm:text-right">
              Phone: +91 98765 43210
              <br />
              Email: hello@anfed.example
            </p>

            {/* Social icons row (white icons) */}
            <div className="mt-4 flex gap-3 justify-start sm:justify-end">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/anfedfpo"
                aria-label="Facebook"
                className="w-6 h-6 text-white hover:opacity-80">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                  aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/anfedfpo/"
                aria-label="Instagram"
                className="w-6 h-6 text-white hover:opacity-80">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                  aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.645.07 4.849 0 3.205-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@ANUMAN.NATHI.FED.FPCL-dp3xs"
                aria-label="YouTube"
                className="w-6 h-6 text-white hover:opacity-80">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                  aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
