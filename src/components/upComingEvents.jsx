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
          const date = data.date
            ? data.date.toDate
              ? data.date.toDate().toLocaleString()
              : new Date(data.date).toLocaleString()
            : "";
          return {
            id: d.id,
            title: data.title || "Untitled",
            date,
            location: data.location || "",
            mainImage: data.imageUrl || data.mainImage || "",
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
    <div className="space-y-8 ml-8 mr-8 mb-10 mt-10 p-4">
  {items.map((ev, index) => (
    <article
      key={ev.id}
      className={`bg-white rounded-lg overflow-hidden flex flex-col md:flex-row ${
        index % 2 === 1 ? "md:flex-row-reverse" : ""
      } gap-6 transform-gpu transition-all duration-300 ease-out hover:scale-102 hover:shadow-lg`}
    >
      {/* Image */}
      {ev.mainImage ? (
        <img
          src={ev.mainImage}
          alt={ev.title}
          className="w-80 h-80 object-cover rounded-xl shadow-lg self-center md:self-auto"
        />
      ) : (
        <div className="w-60 h-60 bg-slate-100 flex items-center justify-center text-gray-400 rounded-xl">
          No image
        </div>
      )}

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col shadow-md justify-between border rounded-xl border-gray-200">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{ev.title}</h3>
          <p className="mt-2 text-gray-700">{ev.description}</p>
          <p className="mt-2 text-sm text-gray-500">
            {ev.date} {ev.location ? `· ${ev.location}` : ""}
          </p>
        </div>

        <div className={`mt-4 flex ${index === 0 ? "justify-end" : "justify-start"}`}>
          <button className="bg-[#448800] font-bold rounded-full transform-gpu transition-transform duration-300 ease-out hover:scale-105 active:scale-100 focus:outline-none px-4 py-2 text-white text-center">
            See More
          </button>
        </div>
      </div>
    </article>
  ))}
</div>

  );
}
