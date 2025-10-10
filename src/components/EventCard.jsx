import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import { useNavigate } from "react-router-dom"; // for navigation

function formatDate(d) {
  if (!d) return "";
  if (d.toDate) d = d.toDate();
  if (typeof d === "string") d = new Date(d);
  if (!(d instanceof Date)) return String(d);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function EventCard({ event, onDelete, isAdmin }) {
  const navigate = useNavigate();
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const {
    id, // Firestore doc ID
    title = "Untitled Event",
    shortDesc = "",
    location = "",
    date,
    thumbnailPath = "",
  } = event || {};

  useEffect(() => {
    let isMounted = true;
    if (!thumbnailPath) return;

    getDownloadURL(ref(storage, thumbnailPath))
      .then((url) => {
        if (isMounted) setThumbnailUrl(url);
      })
      .catch((err) => console.error("Failed to load thumbnail:", err));

    return () => { isMounted = false; };
  }, [thumbnailPath]);

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 relative">
      <div className="w-full h-48 md:h-56 overflow-hidden relative">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
            Loading image...
          </div>
        )}

        {isAdmin && (
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={() => onDelete && onDelete(event)}
              className="bg-white/90 hover:bg-white text-red-600 p-2 rounded-full shadow border"
              title="Delete event"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7L5 7M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-violet-600 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(date)}</span>
        </div>

        <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">{title}</h3>
        {location && <div className="text-sm text-slate-500 mt-1">{location}</div>}
        <p className="mt-4 text-slate-700 text-sm">{shortDesc}</p>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => navigate(`/event/${id}`)} // Navigate to src/pages/Event.jsx
            className="bg-[#448800] text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-[#3b7700] transition"
          >
            Learn more
          </button>
        </div>
      </div>
    </article>
  );
}
