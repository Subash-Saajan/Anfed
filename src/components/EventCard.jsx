import React from "react";
import { useNavigate } from "react-router-dom";

function formatDate(d) {
  if (!d) return "";
  if (d.toDate) d = d.toDate();
  if (typeof d === "string") d = new Date(d);
  if (!(d instanceof Date)) return String(d);
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const EventCard = React.forwardRef(({ event, onDelete, isAdmin }, ref) => {
  const navigate = useNavigate();
  const {
    id,
    title = "Untitled Event",
    shortDesc = "",
    location = "",
    date,
    thumbnailUrl = "",
  } = event || {};

  return (
    <article
      ref={ref}
      className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-slate-200 relative flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="w-full aspect-[4/3] overflow-hidden relative flex-shrink-0">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs sm:text-sm">
            Loading...
          </div>
        )}

        {isAdmin && (
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={() => onDelete && onDelete(event)}
              className="bg-white/90 hover:bg-white text-red-600 p-1.5 sm:p-2 rounded-full shadow border"
              title="Delete event"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7L5 7M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">
        <div className="flex-1 min-h-0">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-green-600 mb-1.5 sm:mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium">{formatDate(date)}</span>
          </div>

          <h3 className="text-sm sm:text-lg font-bold text-slate-900 leading-tight line-clamp-2">
            {title}
          </h3>
          {location && (
            <div className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1 line-clamp-1">{location}</div>
          )}
          <p className="mt-1.5 sm:mt-2 text-slate-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 hidden sm:block">
            {shortDesc}
          </p>
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={() => navigate(`/event/${id}`)}
          className="mt-2 sm:mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:shadow-lg transition-all duration-300"
        >
          Learn more
        </button>
      </div>
    </article>
  );
});

export default EventCard;
