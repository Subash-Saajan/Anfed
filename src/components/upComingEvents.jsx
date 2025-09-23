import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function UpComingEvents() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const docs = snap.docs.map((d) => {
          const data = d.data();
          // normalize date and images to match your UI
          const date = data.date
            ? // handle Firestore Timestamp or ISO/string
              data.date.toDate ? data.date.toDate().toLocaleString() : new Date(data.date).toLocaleString()
            : "";
          return {
            id: d.id,
            title: data.title || "Untitled",
            date,
            location: data.location || "",
            mainImage: data.imageUrl || data.mainImage || "",
            thumbImage: data.thumbImage || data.imageUrl || "",
            description: data.description || "",
          };
        });
        setItems(docs);
        setLoading(false);
      },
      (err) => {
        console.error("upcoming events snapshot error:", err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  if (loading) return <div className="p-4">Loading events…</div>;
  if (!items.length) return <div className="p-4">No upcoming events.</div>;

  return (
    <div className="space-y-4">
      {items.map((ev) => (
        <article
          key={ev.id}
          className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row gap-4 items-start"
        >
          {/* Left: main image */}
          {ev.mainImage ? (
            <img
              src={ev.mainImage}
              alt={ev.title}
              className="w-full md:w-48 h-40 md:h-40 object-cover rounded"
            />
          ) : (
            <div className="w-full md:w-48 h-40 md:h-40 bg-slate-100 rounded flex items-center justify-center text-sm text-slate-400">
              No image
            </div>
          )}

          {/* Right: heading, small top-right image, description, CTA */}
          <div className="flex-1 relative min-h-[160px]">
            {/* small top-right thumbnail */}
            {ev.thumbImage && (
              <img
                src={ev.thumbImage}
                alt={`${ev.title} thumb`}
                className="w-14 h-14 rounded-full border-2 border-white shadow absolute right-0 -mt-2"
              />
            )}

            <div className="pr-4">
              <h3 className="text-lg font-semibold text-gray-900">{ev.title}</h3>
              <div className="text-sm text-gray-500">
                {ev.date} {ev.location ? `· ${ev.location}` : ""}
              </div>

              <p className="mt-3 text-gray-700">{ev.description}</p>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700">
                Learn more
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}