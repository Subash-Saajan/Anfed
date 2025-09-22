export default function Navbar() {
return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur ">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center">

            <div className="items-center justify-start mr-8 w-32">
                    <h1 className="text-xl font-semibold tracking-tight">Anfed</h1>
            </div>

            <div className="flex flex-1 items-center justify-center">
                <nav className="space-x-6">
                    <a
                    href="#"
                    className="inline-block transform-gpu transition duration-300 ease-out hover:scale-110 text-gray-700 hover:text-[#448800] aria-[current=page]:text-[#448800] font-medium"
                    >
                    Home
                    </a>
                    <a
                    href="#"
                    className="inline-block transform-gpu transition duration-300 ease-out hover:scale-110 text-gray-700 hover:text-[#448800] aria-[current=page]:text-[#448800] font-medium"
                    >
                    About
                    </a>
                    <a
                    href="#"
                    className="inline-block transform-gpu transition duration-300 ease-out hover:scale-110 text-gray-700 hover:text-[#448800] aria-[current=page]:text-[#448800] font-medium"
                    >
                    Services
                    </a>
                    <a
                    href="#"
                    className="inline-block transform-gpu transition duration-300 ease-out hover:scale-110 text-gray-700 hover:text-[#448800] aria-[current=page]:text-[#448800] font-medium"
                    >
                    Events
                    </a>
                    <a
                    href="#"
                    className="inline-block transform-gpu transition duration-300 ease-out hover:scale-105 text-gray-700 hover:text-[#448800] aria-[current=page]:text-[#448800] font-medium"
                    >
                    Farmers
                    </a>
                </nav>
            </div>
            <div className="flex justify-end ml-8 w-32">
                <button className="bg-[#448800] font-bold rounded-full transform-gpu transition-transform duration-300 ease-out hover:scale-105 active:scale-100 focus:outline-none px-4 py-2 text-white">
                    Contact 
                </button>
            </div>
        </div>
    </header>
);
}
