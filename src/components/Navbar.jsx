import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `inline-block transform-gpu transition duration-300 ease-out hover:scale-110 text-gray-700 hover:text-[#448800] font-medium ${
      isActive ? "text-[#448800]" : ""
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur ">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center">
        <div className="items-center justify-start ml-16 w-32">
          <h1 className="text-xl font-semibold tracking-tight">Anfed</h1>
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

        <div className="flex justify-end mr-16 w-32">
          <NavLink to="/contact" className="bg-[#448800] font-bold rounded-full transform-gpu transition-transform duration-300 ease-out hover:scale-105 active:scale-100 focus:outline-none px-4 py-2 text-white text-center">
            Contact
          </NavLink>
        </div>
      </div>
    </header>
  );
}
