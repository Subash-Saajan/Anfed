import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0f1b0a] text-white rounded-t-[36px]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Left column: Company name */}
          <div className="flex flex-col">
            <h3 className="text-lg sm:text-xl font-extrabold leading-tight text-[#eef7ea]">
              Anuman Nadhi Fed
              <br />
              Producer Company Ltd <span className="text-pink-400">❤</span>
            </h3>
          </div>

          {/* Middle column: Quick links */}
          <div className="flex flex-col items-start sm:items-center">
            <h4 className="text-sm font-bold mb-3 text-[#e6f0e6]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[#d6e9d6]">
              <li>
                <a href="/about" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="/services" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="/programs" className="hover:underline">
                  Programs
                </a>
              </li>
            </ul>
          </div>

          {/* Right column: Reach us on */}
          <div className="flex flex-col items-start sm:items-end">
            <h4 className="text-sm font-bold mb-3 text-[#e6f0e6]">
              Reach us on
            </h4>
            <p className="text-sm text-[#d6e9d6] leading-relaxed">
              {/* placeholder content — adjust to match your real contact items */}
              Phone: +91 98765 43210
              <br />
              Email: hello@anfed.example
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
