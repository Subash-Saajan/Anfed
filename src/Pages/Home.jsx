import { useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgImage from "../assets/Banner.jpg";
import UpComingEvents from "../components/upComingEvents";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const buttonRef = useRef(null);
  const heroImageRef = useRef(null); // only image

  cardsRef.current = [];
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

      // Hero image initial animation
      tl.from(heroImageRef.current, { scale: 1.2, opacity: 0, duration: 1.5, ease: "power4.out" })
        .from(".hero-hover .text-2xl", { y: 30, opacity: 0, duration: 0.8 }, "-=1.2")
        .from(".hero-hover h2", { y: 50, opacity: 0, duration: 1.1 }, "-=1")
        .from(buttonRef.current, { opacity: 0, y: 20, duration: 0.8, ease: "back.out(1.7)" });

      // Cards scroll animation
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 1.2,
          delay: i * 0.15,
          ease: "power3.out",
        });
      });

      // Upcoming Events scroll reveal
      gsap.from(".upcoming-section", {
        scrollTrigger: {
          trigger: ".upcoming-section",
          start: "top 90%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Hero image hover zoom
    if (heroImageRef.current) {
      gsap.set(heroImageRef.current, { transformOrigin: "center center" });
      heroImageRef.current.addEventListener("mouseenter", () =>
        gsap.to(heroImageRef.current, { scale: 1.1, duration: 0.8, ease: "power3.out" })
      );
      heroImageRef.current.addEventListener("mouseleave", () =>
        gsap.to(heroImageRef.current, { scale: 1, duration: 0.8, ease: "power3.out" })
      );
    }

    // Hero button hover
    if (buttonRef.current) {
      gsap.set(buttonRef.current, { transformOrigin: "center center" });
      buttonRef.current.addEventListener("mouseenter", () =>
        gsap.to(buttonRef.current, { scale: 1.05, duration: 0.3, ease: "power3.out" })
      );
      buttonRef.current.addEventListener("mouseleave", () =>
        gsap.to(buttonRef.current, { scale: 1, duration: 0.3, ease: "power3.out" })
      );
    }

    // Cards hover
    cardsRef.current.forEach((card) => {
      gsap.set(card, { transformOrigin: "center center" });
      card.addEventListener("mouseenter", () =>
        gsap.to(card, { scale: 1.05, duration: 0.5, ease: "power3.out" })
      );
      card.addEventListener("mouseleave", () =>
        gsap.to(card, { scale: 1, duration: 0.5, ease: "power3.out" })
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="m-7 overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden hero-hover">
        <img
          ref={heroImageRef}
          src={bgImage}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#000000aa] via-[#01010150] to-[#FFFFFF00]"
          style={{ pointerEvents: "none" }}
        />

        {/* Hero text */}
        <div className="absolute top-5 left-10 text-white z-10">
          <p className="text-2xl italic font-thin">Soil to Soul</p>
        </div>
        <div className="absolute bottom-20 left-10 text-white z-10">
          <h2 className="text-4xl font-bold">
            Anuman Nadhi Fed <br />
            Farmer Producer Company Ltd
          </h2>
        </div>

        {/* Hero button */}
        <div className="absolute bottom-6 left-10 z-20">
          <button
            ref={buttonRef}
            className="bg-white text-black text-md font-bold py-2 px-6 rounded-full"
          >
            About us
          </button>
        </div>
      </div>

      {/* Overview Section */}
      <section className="mt-10 ml-3 mr-3">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <span className="h-[6px] w-12 bg-green-700"></span>
            <h3 className="text-xl sm:text-2xl font-bold uppercase text-green-700 tracking-wide">
              Overview
            </h3>
          </div>
          <p className="mt-2 text-sm sm:text-base font-medium text-gray-800">
            Overview title goes here
          </p>
          <div className="mt-1 text-[12px] sm:text-sm text-gray-700 leading-relaxed font-medium">
            <p className="mt-1">
              Overview paragraph goes here overview paragraph goes here overview
              paragraph goes here
            </p>
            <p className="mt-1">
              Overview paragraph goes here overview paragraph goes here
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-7 justify-center justify-items-center">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              ref={addToRefs}
              className="relative rounded-xl bg-white p-10 shadow-xl"
            >
              <div className="absolute -top-4 left-6 h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center">
                <div className="h-7 w-7 rounded-full border-4 border-green-700 flex items-center justify-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-700 block"></span>
                </div>
              </div>
              <div className="mt-3">
                <h4 className="text-xl sm:text-base font-bold text-gray-800">
                  Who we are.
                </h4>
                <p className="mt-2 text-[11px] font-bold sm:text-[12px] text-gray-600 leading-relaxed">
                  Anuman River basin of the Western Ghats, our journey began
                  with the revival of Hanumanathi (Anuman Nadhi) — lifeline for
                  farmers across Radhapuram Taluk in Tirunelveli District.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="upcoming-section mt-15 ml-3 mr-3">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-[6px] w-12 bg-[#448800]"></span>
          <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#448800] tracking-wide">
            Upcoming Events
          </h3>
        </div>
        <UpComingEvents />
      </section>
    </div>
  );
}