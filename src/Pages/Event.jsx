import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebase";
import { gsap } from "gsap";

function formatDate(d) {
  if (!d) return "";
  if (d.toDate) d = d.toDate();
  if (typeof d === "string") d = new Date(d);
  if (!(d instanceof Date)) return String(d);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Event() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [galleryUrls, setGalleryUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  itemRefs.current = [];

  const addToRefs = (el) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };

  useEffect(() => {
    let mounted = true;
    async function fetchEvent() {
      try {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          if (!mounted) return;
          setEvent(null);
          return;
        }

        const data = docSnap.data();
        if (!mounted) return;
        setEvent(data);

        // Load thumbnail
        if (data.thumbnailPath) {
          const url = await getDownloadURL(ref(storage, data.thumbnailPath));
          if (mounted) setThumbnailUrl(url);
        }

        // Load gallery
        if (data.galleryPaths && data.galleryPaths.length > 0) {
          const urls = await Promise.all(
            data.galleryPaths.map((path) => getDownloadURL(ref(storage, path)))
          );
          if (mounted) setGalleryUrls(urls);
        }
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    fetchEvent();

    return () => {
      mounted = false;
    };
  }, [id]);

  // GSAP animation for individual components after loading
  useEffect(() => {
    if (!isLoading && itemRefs.current.length > 0) {
      gsap.fromTo(
        itemRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
        }
      );
    }
  }, [isLoading]);

  // Minimal spinner
  const spinner = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <>
      {isLoading && spinner}

      <div
        ref={containerRef}
        className={`min-h-screen max-w-6xl mx-auto mt-10 p-4 grid grid-cols-1 md:grid-cols-2 gap-6 ${
          isLoading ? "hidden" : ""
        }`}
      >
        {/* Left Section */}
        <div className="flex flex-col flex-1 gap-4">
          {thumbnailUrl && (
            <img
              ref={addToRefs}
              src={thumbnailUrl}
              alt={event?.title}
              className="w-full h-64 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            />
          )}
          <div ref={addToRefs} className="text-sm text-violet-600">
            {formatDate(event?.date)}
          </div>
          <h1
            ref={addToRefs}
            className="text-3xl font-bold mt-2"
          >
            {event?.title}
          </h1>
          {event?.location && (
            <div ref={addToRefs} className="text-gray-600 mt-1">
              {event.location}
            </div>
          )}
          {event?.shortDesc && (
            <p ref={addToRefs} className="text-gray-700">
              {event.shortDesc}
            </p>
          )}
          {event?.fullDesc && (
            <p ref={addToRefs} className="text-gray-700">
              {event.fullDesc}
            </p>
          )}
        </div>

        {/* Right Section */}
        <div className="flex flex-col flex-1 gap-4 mt-6 md:mt-0 items-start">
          {event?.youtubeLink && (
            <div
              ref={addToRefs}
              className="w-full aspect-video transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <iframe
                src={event.youtubeLink.replace("watch?v=", "embed/")}
                title="YouTube video"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full rounded-lg"
              />
            </div>
          )}

          {galleryUrls.length > 0 && (
            <div
              ref={addToRefs}
              className="grid grid-cols-2 gap-2 w-full"
            >
              {galleryUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-32 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                  ref={addToRefs}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
