import React, { useEffect, useState, useRef } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

export default function HomeEvents() {
  const [events, setEvents] = useState([]);
  const cardsRef = useRef([]);

  cardsRef.current = [];
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("date", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          title: data.title || "",
          shortDesc: data.shortDesc || data.description || "",
          thumbnailPath: data.thumbnailPath || "",
        };
      });
      setEvents(docs);
    });

    return () => unsub();
  }, []);

  // GSAP animations
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      const image = card.querySelector("img");

      // Fade in + slide animation
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: index * 0.2,
        ease: "power3.out",
      });

      // Hover animation
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { scale: 1.03, duration: 0.4, ease: "power3.out" });
        gsap.to(image, { scale: 1.1, duration: 0.5, ease: "power3.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, duration: 0.4, ease: "power3.out" });
        gsap.to(image, { scale: 1, duration: 0.5, ease: "power3.out" });
      });
    });
  }, [events]);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col gap-12 items-center">
        {events.map((ev, idx) => (
          <HomeEventCard
            key={ev.id}
            event={ev}
            addToRefs={addToRefs}
            reverse={idx % 2 === 1} // Alternate layout
          />
        ))}
      </div>
    </div>
  );
}

function HomeEventCard({ event, addToRefs, reverse }) {
  const navigate = useNavigate();
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const { id, title = "Untitled", shortDesc = "", thumbnailPath = "" } = event || {};

  useEffect(() => {
    let isMounted = true;
    if (!thumbnailPath) return;

    getDownloadURL(ref(storage, thumbnailPath))
      .then((url) => isMounted && setThumbnailUrl(url))
      .catch((err) => console.error("Failed to load thumbnail:", err));

    return () => {
      isMounted = false;
    };
  }, [thumbnailPath]);

  return (
    <div
      ref={addToRefs}
      className={`flex flex-col md:flex-row items-center w-full ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image Card */}
      <div className="w-[300px] h-[300px] rounded-2xl overflow-hidden shadow-md flex-shrink-0">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover rounded-2xl transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 rounded-2xl">
            Loading image...
          </div>
        )}
      </div>

      {/* Content Card */}
      <div
        className={`bg-white rounded-2xl shadow-md p-5 mt-4 md:mt-0 md:px-6 md:py-5 h-[300px] flex flex-col justify-between
          w-[300px] md:flex-1 ${reverse ? "md:ml-4 ml-0" : "md:mr-4 mr-0"}`}
      >
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">{title}</h3>
          <p className="mt-3 text-slate-700 text-sm">{shortDesc}</p>
        </div>
        <div className={`mt-5 ${reverse ? "self-end" : "self-start"}`}>
          <button
            onClick={() => navigate(`/event/${id}`)}
            className="bg-[#448800] text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-[#3b7700] transition"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
}
