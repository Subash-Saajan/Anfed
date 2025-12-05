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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, upcoming, past
  const cardsRef = useRef([]);

  // Fetch events from Firestore
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
              galleryPaths: data.galleryUrls || [],
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

  // Listen to auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  // Animate cards
  useEffect(() => {
    if (events.length && cardsRef.current.length) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 60,               // move more
        scale: 0.95,         // start slightly smaller
        stagger: 0.15,       // stagger each card
        duration: 0.8,       // longer duration
          
      });
    }
  }, [events]);
  
  // Delete event
  const handleDelete = async (event) => {
    const ok = confirm(`Delete event "${event.title}"? This cannot be undone.`);
    if (!ok) return;

    try {
      if (event.thumbnailPath) await deleteObject(sRef(storage, event.thumbnailPath));
      if (event.galleryPaths?.length) {
        for (const path of event.galleryPaths) {
          try {
            await deleteObject(sRef(storage, path));
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

  // Filter events based on search query and filter type
  const filteredEvents = events.filter((e) => {
    const matchesSearch = searchQuery === "" ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === "upcoming") return e.date >= now;
    if (filterType === "past") return e.date < now;
    return true; // "all"
  });

  const upcomingEvents = filteredEvents.filter((e) => e.date >= now);
  const pastEvents = filteredEvents.filter((e) => e.date < now);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">Events</h1>
        <p className="text-sm sm:text-base text-gray-600">Discover our upcoming and past events</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-3 sm:p-6 mb-6 sm:mb-8 border border-gray-100">
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-gray-50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {[
              { value: "all", label: "All" },
              { value: "upcoming", label: "Upcoming" },
              { value: "past", label: "Past" },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterType(filter.value)}
                className={`flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
                  filterType === filter.value
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {searchQuery && (
          <div className="mt-3 text-xs sm:text-sm text-gray-500">
            Found {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        )}
      </div>

      {/* Upcoming Events */}
      {(filterType === "all" || filterType === "upcoming") && (
        <section className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="h-6 sm:h-8 w-1 sm:w-1.5 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></span>
              <span className="h-4 sm:h-6 w-0.5 sm:w-1 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></span>
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Upcoming Events</h2>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
              {upcomingEvents.length}
            </span>
          </div>

          {upcomingEvents.length ? (
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-hide">
              {upcomingEvents.map((ev, idx) => (
                <div key={ev.id} className="flex-shrink-0 w-[200px] sm:w-[280px] lg:w-[300px] snap-start">
                  <EventCard
                    event={ev}
                    isAdmin={!!user}
                    onDelete={handleDelete}
                    ref={(el) => (cardsRef.current[idx] = el)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full py-8 sm:py-12 text-center text-gray-500 bg-gray-50 rounded-xl">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <p className="text-sm sm:text-base">No upcoming events found</p>
            </div>
          )}
        </section>
      )}

      {/* Past Events */}
      {(filterType === "all" || filterType === "past") && (
        <section>
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="h-6 sm:h-8 w-1 sm:w-1.5 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full"></span>
              <span className="h-4 sm:h-6 w-0.5 sm:w-1 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full"></span>
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Past Events</h2>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm font-medium">
              {pastEvents.length}
            </span>
          </div>

          {pastEvents.length ? (
            <div className="grid gap-3 sm:gap-4 lg:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {pastEvents.map((ev, idx) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  isAdmin={!!user}
                  onDelete={handleDelete}
                  ref={(el) => (cardsRef.current[idx + upcomingEvents.length] = el)}
                />
              ))}
            </div>
          ) : (
            <div className="w-full py-8 sm:py-12 text-center text-gray-500 bg-gray-50 rounded-xl">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p className="text-sm sm:text-base">No past events found</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
