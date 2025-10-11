import React, { useEffect, useState, useRef } from "react";
import { doc, deleteDoc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref as sRef, deleteObject, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../firebase";
import EventCard from "../components/EventCard";
import { onAuthStateChanged } from "firebase/auth";
import { gsap } from "gsap";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const cardsRef = useRef([]);

  // Preload images
  const preloadImages = (urls) =>
    Promise.all(
      urls.map(
        (url) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = resolve;
          })
      )
    );

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("date", "asc"));
    const unsub = onSnapshot(
      q,
      async (snap) => {
        const docs = await Promise.all(
          snap.docs.map(async (d) => {
            const data = d.data();

            let thumbUrl = data.thumbnailUrl || "";
            if (!thumbUrl && data.thumbnailPath) {
              try {
                thumbUrl = await getDownloadURL(sRef(storage, data.thumbnailPath));
              } catch (err) {
                console.warn("Failed to fetch thumbnail:", err);
              }
            }

            return {
              id: d.id,
              title: data.title || "",
              shortDesc: data.shortDesc || data.description || "",
              location: data.location || data.place || "",
              date: data.date ? new Date(data.date.seconds * 1000) : new Date(),
              thumbnailUrl: thumbUrl,
              thumbnailPath: data.thumbnailPath || "",
              galleryUrls: data.galleryUrls || [],
            };
          })
        );

        const allImageUrls = docs.flatMap((d) => [d.thumbnailUrl, ...(d.galleryUrls || [])]).filter(Boolean);
        await preloadImages(allImageUrls);

        setEvents(docs);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  // GSAP animation
  useEffect(() => {
    if (events.length && cardsRef.current.length) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [events]);

  const handleDelete = async (event) => {
    const ok = confirm(`Delete event "${event.title}"? This cannot be undone.`);
    if (!ok) return;

    try {
      if (event.thumbnailPath) await deleteObject(sRef(storage, event.thumbnailPath));
      if (event.galleryUrls?.length) {
        for (const url of event.galleryUrls) {
          try {
            const parts = url.split("/o/");
            if (parts[1]) {
              const path = decodeURIComponent(parts[1].split("?")[0]);
              await deleteObject(sRef(storage, path));
            }
          } catch (err) {
            console.warn("Failed to delete gallery image:", err);
          }
        }
      }
      await deleteDoc(doc(db, "events", event.id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed: " + (err.message || err));
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  const now = new Date();
  const upcomingEvents = events.filter((e) => e.date >= now);
  const pastEvents = events.filter((e) => e.date < now);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>

      {/* Horizontal scroll for upcoming events */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {upcomingEvents.length ? (
          upcomingEvents.map((ev, idx) => (
            <div key={ev.id} className="flex-shrink-0 w-[280px]">
              <EventCard event={ev} isAdmin={!!user} onDelete={handleDelete} ref={(el) => (cardsRef.current[idx] = el)} />
            </div>
          ))
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>

      <h1 className="text-2xl font-bold my-6">Past Events</h1>

      {/* Grid layout for past events */}
      {pastEvents.length ? (
        <div
          className="
            grid gap-6
            grid-cols-2
            md:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]
            xl:[grid-template-columns:repeat(4,minmax(0,1fr))]
          "
        >
          {pastEvents.map((ev, idx) => (
            <EventCard key={ev.id} event={ev} isAdmin={!!user} onDelete={handleDelete} ref={(el) => (cardsRef.current[idx] = el)} />
          ))}
        </div>
      ) : (
        <p>No past events.</p>
      )}
    </div>
  );
}
