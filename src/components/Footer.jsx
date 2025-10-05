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
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.344 3.608 1.32.975.975 1.258 2.242 1.32 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.344 2.633-1.32 3.608-.975.975-2.242 1.258-3.608 1.32-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.344-3.608-1.32-.975-.975-1.258-2.242-1.32-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.344-2.633 1.32-3.608.975-.975 2.242-1.258 3.608-1.32C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.17 0-3.548.012-4.797.069-1.016.054-1.565.223-1.93.37-.49.197-.84.433-1.21.802-.369.37-.605.72-.802 1.21-.147.365-.316.914-.37 1.93-.057 1.249-.069 1.627-.069 4.797s.012 3.548.069 4.797c.054 1.016.223 1.565.37 1.93.197.49.433.84.802 1.21.37.369.72.605 1.21.802.365.147.914.316 1.93.37 1.249.057 1.627.069 4.797.069s3.548-.012 4.797-.069c1.016-.054 1.565-.223 1.93-.37.49-.197.84-.433 1.21-.802.369-.37.605-.72.802-1.21.147-.365.316-.914.37-1.93.057-1.249.069-1.627.069-4.797s-.012-3.548-.069-4.797c-.054-1.016-.223-1.565-.37-1.93-.197-.49-.433-.84-.802-1.21-.37-.369-.72-.605-1.21-.802-.365-.147-.914-.316-1.93-.37-1.249-.057-1.627-.069-4.797-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com"
                aria-label="LinkedIn"
                className="w-6 h-6 text-white hover:opacity-80">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6">
                  <path d="M4.98 3.5A2.5 2.5 0 112.48 6 2.5 2.5 0 014.98 3.5zM3 8.75h3.98V21H3zM9.5 8.75H13v1.64c.56-1 1.9-2.05 4.12-2.05 4.4 0 5.2 2.9 5.2 6.66V21h-3.98v-5.08c0-1.21-.02-2.76-1.68-2.76-1.69 0-1.95 1.32-1.95 2.68V21H9.5z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://www.twitter.com"
                aria-label="X"
                className="w-6 h-6 text-white hover:opacity-80">
                <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                  <line
                    x1="4"
                    y1="4"
                    x2="20"
                    y2="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="20"
                    y1="4"
                    x2="4"
                    y2="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com"
                aria-label="YouTube"
                className="w-6 h-6 text-white hover:opacity-80">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="currentColor"
                  aria-hidden="true">
                  <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
                  <polygon points="10,9 16,12 10,15" fill="#0f1b0a" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
