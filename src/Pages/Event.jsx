import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebase";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

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

  const textAndThumbnailRefs = useRef([]);
  const galleryRefs = useRef([]);
  textAndThumbnailRefs.current = [];
  galleryRefs.current = [];

  const addTextRef = (el) => {
    if (el && !textAndThumbnailRefs.current.includes(el))
      textAndThumbnailRefs.current.push(el);
  };
  const addGalleryRef = (el) => {
    if (el && !galleryRefs.current.includes(el))
      galleryRefs.current.push(el);
  };

  useEffect(() => {
    let mounted = true;

    async function fetchEvent() {
      try {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          if (mounted) setEvent(null);
          return;
        }

        const data = docSnap.data();
        if (mounted) setEvent(data);

        if (data.thumbnailPath) {
          const url = await getDownloadURL(ref(storage, data.thumbnailPath));
          if (mounted) setThumbnailUrl(url);
        }

        if (data.galleryPaths?.length) {
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
    return () => (mounted = false);
  }, [id]);

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(
        textAndThumbnailRefs.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen max-w-6xl mx-auto mt-10 p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Section */}
      <div className="flex flex-col flex-1 gap-4">
        {isLoading ? (
          <div className="w-full h-64 bg-slate-200 rounded-lg animate-pulse" />
        ) : (
          thumbnailUrl && (
            <img
              ref={addTextRef}
              src={thumbnailUrl}
              alt={event?.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )
        )}

        {isLoading ? (
          <>
            <div className="w-24 h-4 bg-slate-200 rounded animate-pulse" />
            <div className="w-3/4 h-6 bg-slate-200 rounded animate-pulse" />
            <div className="w-1/2 h-4 bg-slate-200 rounded animate-pulse" />
            <div className="w-full h-20 bg-slate-200 rounded animate-pulse" />
          </>
        ) : (
          <>
            <div ref={addTextRef} className="text-sm text-violet-600">
              {formatDate(event?.date)}
            </div>
            <h1 ref={addTextRef} className="text-3xl font-bold mt-2">
              {event?.title}
            </h1>
            {event?.location && (
              <div ref={addTextRef} className="text-gray-600 mt-1">
                {event.location}
              </div>
            )}
            {event?.shortDesc && (
              <p ref={addTextRef} className="text-gray-700">
                {event.shortDesc}
              </p>
            )}
            {event?.fullDesc && (
              <p ref={addTextRef} className="text-gray-700">
                {event.fullDesc}
              </p>
            )}
          </>
        )}
      </div>

      {/* Right Section */}
      <div className="flex flex-col flex-1 gap-4 mt-6 md:mt-0 items-start">
        {event?.youtubeLink && !isLoading && (
          <div className="w-full aspect-video cursor-pointer">
            <iframe
              src={event.youtubeLink.replace("watch?v=", "embed/")}
              title="YouTube video"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        )}

        {/* Gallery Section */}
        {isLoading ? (
          <div className="grid grid-cols-2 auto-rows-[8rem] gap-2 w-full">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-full h-full bg-slate-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          galleryUrls.length > 0 && (
            <div
              id="gallery-grid"
              className="grid grid-cols-2 auto-rows-[12rem] gap-2 w-full"
            >
              {galleryUrls.map((url, idx) => (
                <div
                  key={idx}
                  ref={addGalleryRef}
                  className="gallery-item relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={(e) => {
                    const el = e.currentTarget;
                    const grid = document.getElementById("gallery-grid");
                    const state = Flip.getState(".gallery-item");

                    grid.querySelectorAll(".gallery-item").forEach((item) => {
                      item.style.gridColumn = "span 1";
                      item.style.gridRow = "span 1";
                      item.dataset.zoomed = "false";
                      gsap.to(item, { scale: 1, duration: 0.3 });
                    });

                    const isZoomed = el.dataset.zoomed === "true";
                    if (!isZoomed) {
                      el.style.gridColumn = "span 2";
                      el.style.gridRow = "span 2";
                      el.dataset.zoomed = "true";
                      gsap.to(el, { scale: 1.03, duration: 0.4, ease: "power2.out" });
                    }

                    Flip.from(state, {
                      duration: 0.6,
                      ease: "power2.inOut",
                      absolute: false,
                      scale: true,
                    });
                  }}
                >
                  <img
                    src={url}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
