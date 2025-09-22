import UpComingEvents from "../components/upComingEvents";
export default function Events() {
  return (
    <div className="min-h-screen relative p-6 bg-white">
      
    <h1 className="text-3xl font-bold text-slate-900 mb-6">Events Page</h1>
        <UpComingEvents />

      {/* Floating circular + button */}
      <button
        aria-label="Add event"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#448800] text-white rounded-full flex items-center justify-center shadow-xl transform-gpu transition-transform duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#b7f299] focus:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}