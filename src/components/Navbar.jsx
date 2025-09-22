export default function Navbar() {
  return (
    <header className="w-full bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Anfed</h1>
        <nav className="space-x-6">
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
