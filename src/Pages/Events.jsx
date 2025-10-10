import React, { useEffect, useState } from "react";
import { doc, deleteDoc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref as sRef, deleteObject } from "firebase/storage";
import { db, storage, auth } from "../firebase";
import EventCard from "../components/EventCard";
import { onAuthStateChanged } from "firebase/auth";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Preload all images
  const preloadImages = (urls) => {
    return Promise.all(
      urls.map(
        (url) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = resolve; // resolve anyway if error
          })
      )
    );
  };

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("date", "asc"));
    const unsub = onSnapshot(
      q,
      async (snap) => {
        const docs = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            title: data.title || "",
            shortDesc: data.shortDesc || data.description || "",
            location: data.location || data.place || "",
            date: data.date || data.createdAt || null,
            thumbnailUrl: data.thumbnailUrl || "",
            thumbnailPath: data.thumbnailPath || "",
            galleryUrls: data.galleryUrls || [],
          };
        });

        // Preload all images (thumbnails + gallery)
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

  // Minimal modern full-screen spinner
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!events.length) return <div className="p-6">No upcoming events.</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>

      <div
        className="
          grid gap-6
          grid-cols-2
          md:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]
          xl:[grid-template-columns:repeat(4,minmax(0,1fr))]
        "
      >
        {events.map((ev) => (
          <EventCard
            key={ev.id}
            event={ev}
            isAdmin={!!user}
            onLearnMore={(e) => console.log("Learn more", e.id)}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
