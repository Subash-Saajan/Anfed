import React, { useEffect, useState } from "react";
import { doc, deleteDoc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref as sRef, deleteObject } from "firebase/storage";
import { db, storage, auth } from "../firebase";
import EventCard from "../components/EventCard";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL } from "firebase/storage";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("date", "asc"));
    const unsub = onSnapshot(
      q,
      async (snap) => {
        const docs = await Promise.all(
          snap.docs.map(async (d) => {
            const data = d.data();
            let imageUrl = data.imageUrl || "";
            if (!imageUrl && data.storagePath) {
              try {
                imageUrl = await getDownloadURL(ref(storage, data.storagePath));
              } catch (err) {
                console.warn("failed to getDownloadURL for", data.storagePath, err);
              }
            }
            return {
              id: d.id,
              title: data.title || "",
              description: data.description || "",
              location: data.location || data.place || "",
              date: data.date || data.createdAt || null,
              imageUrl,
              storagePath: data.storagePath || "",
            };
          })
        );
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
      // determine storage path:
      let storagePath = event.storagePath || event.imagePath || event.storage_path;

      // if not stored, try to parse it from a download URL like:
      // https://firebasestorage.googleapis.com/v0/b/<bucket>/o/<encodedPath>?alt=media&token=...
      if (!storagePath && event.imageUrl) {
        try {
          const parts = event.imageUrl.split("/o/");
          if (parts[1]) {
            storagePath = decodeURIComponent(parts[1].split("?")[0]);
          }
        } catch (e) {
          console.warn("Could not parse storage path from imageUrl", e);
        }
      }

      // delete storage object if we have a path
      if (storagePath) {
        try {
          await deleteObject(sRef(storage, storagePath));
          console.log("Storage object deleted:", storagePath);
        } catch (err) {
          console.warn("Failed to delete storage object (may be permission or already removed):", err);
          // continue to try removing the Firestore doc anyway
        }
      } else {
        console.warn("No storagePath found on event; skipping storage deletion.");
      }

      // delete Firestore document
      await deleteDoc(doc(db, "events", event.id));
      console.log("Firestore doc deleted:", event.id);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed: " + (err.message || err));
    }
  };

  if (loading) return <div className="p-6">Loading events…</div>;
  if (!events.length) return <div className="p-6">No upcoming events.</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>

      <div
        className="
          grid gap-6
          grid-cols-2                                  /* mobile: 2 cols */
          md:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] /* md+: auto-fit -> 2/3/4 depending on width */
          xl:[grid-template-columns:repeat(4,minmax(0,1fr))]            /* cap at 4 on very wide screens */
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