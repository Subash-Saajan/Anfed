import { useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import bgImage from "../assets/Banner4.png";
import StatisticsCard from "../components/StatisticsCard";
import Rectangle34 from "../assets/Rectangle34.png";
import Rectangle35 from "../assets/Rectangle35.png";
import Rectangle36 from "../assets/Rectangle36.png";
import Rectangle37 from "../assets/Rectangle37.png";
import HomeEvents from "../components/HomeEvents";
import CoreValues from "../components/CoreValues";
import Initiatives from "../components/Initiatives";
import OverviewCards from "../components/OverviewCards";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Home() {
  const containerRef = useRef(null);
  const statsCardsRef = useRef([]);
  const overviewCardsRef = useRef([]);
  const overviewHeaderRef = useRef(null);
  const overviewTextRef = useRef(null);
  const overviewParaRef = useRef(null);
  const buttonRef = useRef(null); 
  const heroImageRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroHeadingRef = useRef(null);

  statsCardsRef.current = [];
  overviewCardsRef.current = [];

  const addStatsRef = (el) => {
    if (el && !statsCardsRef.current.includes(el)) statsCardsRef.current.push(el);
  };

  const addOverviewRef = (el) => {
    if (el && !overviewCardsRef.current.includes(el)) overviewCardsRef.current.push(el);
  };

  // GSAP Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

      // Hero section animation
      tl.from(heroImageRef.current, { scale: 1.2, opacity: 0, duration: 1.5, ease: "power4.out" })
        .from(heroSubtitleRef.current, { opacity: 0, y: 30, duration: 0.8 }, "-=1.2")
        .from(heroHeadingRef.current, { opacity: 0, y: 50, duration: 1.1 }, "-=1")
        .from(buttonRef.current, { opacity: 0, y: 20, duration: 0.8, ease: "back.out(1.7)" });

      // Overview section animations
      [overviewHeaderRef, overviewTextRef, overviewParaRef].forEach((ref, idx) => {
        if (ref.current) {
          gsap.from(ref.current, {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: idx * 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 90%" },
          });
        }
      });

      // Overview cards animations
      overviewCardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 95%", toggleActions: "play none none reverse" },
          delay: index * 0.2,
        });
      });

      // Statistics cards & number count
      statsCardsRef.current.forEach((card) => {
        const numberEl = card.querySelector("span[data-target]");
        if (numberEl) {
          const target = +numberEl.getAttribute("data-target");
          gsap.fromTo(numberEl, { innerText: 0 }, {
            innerText: target,
            duration: 2,
            ease: "power1.out",
            snap: { innerText: 1 },
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
          });
        }

        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      // Events section reveal
      gsap.from(".home-events-section", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: ".home-events-section", start: "top 90%" },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover effects
  useEffect(() => {
    // Hero image hover
    if (heroImageRef.current) {
      gsap.set(heroImageRef.current, { transformOrigin: "center center" });
      heroImageRef.current.addEventListener("mouseenter", () => gsap.to(heroImageRef.current, { scale: 1.1, duration: 0.8, ease: "power3.out" }));
      heroImageRef.current.addEventListener("mouseleave", () => gsap.to(heroImageRef.current, { scale: 1, duration: 0.8, ease: "power3.out" }));
    }

    // Hero button hover
    if (buttonRef.current) {
      gsap.set(buttonRef.current, { transformOrigin: "center center" });
      buttonRef.current.addEventListener("mouseenter", () => gsap.to(buttonRef.current, { scale: 1.05, duration: 0.3, ease: "power3.out" }));
      buttonRef.current.addEventListener("mouseleave", () => gsap.to(buttonRef.current, { scale: 1, duration: 0.3, ease: "power3.out" }));
    }

    // Card hover effects
    // Card hover effects (only overview cards)
overviewCardsRef.current.forEach((card) => {
  gsap.set(card, { transformOrigin: "center center" });
  card.addEventListener("mouseenter", () => gsap.to(card, { scale: 1.05, duration: 0.5, ease: "power3.out" }));
  card.addEventListener("mouseleave", () => gsap.to(card, { scale: 1, duration: 0.5, ease: "power3.out" }));
});

// Stats card hover effect (only image zoom)
// Stats card image hover effect
// Stats card hover effect (background div zoom)
statsCardsRef.current.forEach((card) => {
  const bgDiv = card.querySelector("div.absolute.inset-0"); // select background div
  if (!bgDiv) return;

  gsap.set(bgDiv, { transformOrigin: "center center" });

  // Remove previous listeners to avoid duplicates
  card.onmouseenter = null;
  card.onmouseleave = null;

  card.addEventListener("mouseenter", () => {
    gsap.to(bgDiv, { scale: 1.1, duration: 0.5, ease: "power3.out" });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(bgDiv, { scale: 1, duration: 0.5, ease: "power3.out" });
  });
});



  }, []);

  return (
    <div ref={containerRef} className="m-7 overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden hero-hover">
        <img ref={heroImageRef} src={bgImage} alt="Hero" className="w-full h-full object-cover" />

        {/* Subtitle */}
        <div className="absolute top-5 left-10 text-white z-10">
          <p ref={heroSubtitleRef} className="text-lg sm:text-2xl italic font-thin">Soil to Soul</p>
        </div>

        {/* Main heading */}
        <div className="absolute bottom-20 left-10 text-white z-10">
          <h2 ref={heroHeadingRef} className="text-2xl sm:text-4xl font-bold">
            Anuman Nadhi Fed <br />
            Farmer Producer Company Ltd
          </h2>
        </div>

        {/* Button */}
        <div className="absolute bottom-6 left-10 z-20">
          <button ref={buttonRef} className="bg-white text-black text-sm sm:text-md font-bold py-2 px-6 rounded-full">
            About us
          </button>
        </div>
      </div>

      {/* Overview Section */}
      <section className="mt-10 ml-3 mr-3">
        <div className="mb-6">
          <div className="flex items-center gap-3" ref={overviewHeaderRef}>
            <span className="h-[6px] w-12 bg-green-700"></span>
            <h3 className="text-xl sm:text-2xl font-bold uppercase text-green-700 tracking-wide">Overview</h3>
          </div>
          <p className="mt-2 text-sm sm:text-base font-medium text-gray-800" ref={overviewTextRef}>
            Rooted in Tradition, Growing for the Future
          </p>
          <div className="mt-1 text-[12px] sm:text-sm text-gray-700 leading-relaxed font-medium">
            <p className="mt-1" ref={overviewParaRef}>
              Born from the revival of the Anuman River, ANFED FPO unites farmers to promote sustainable, natural, and herbal farming. We bridge the gap between farmers and consumers through direct market linkages, ensuring fair prices, transparency, and trust.
            </p>
          </div>
        </div>
        <OverviewCards addRef={addOverviewRef} />
      </section>

      {/* Statistics Cards Section */}
      <section className="mt-16 ml-4 mr-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[Rectangle34, Rectangle35, Rectangle36, Rectangle37].map((img, i) => (
            <StatisticsCard
              key={i}
              ref={addStatsRef}
              imageSrc={img}
              number={[400, 10, 1800, 22][i]}
              description={[
                "Farmers empowered through natural farming",
                "Outlets under ANFED MART",
                "Acres under natural cultivation",
                "Waterbodies revived in the Anuman Nathi basin",
              ][i]}
              dataTarget={[400, 10, 1800, 22][i]}
            />
          ))}
        </div>
      </section>

      {/* Other Sections */}
      <section>
        <CoreValues />
        <Initiatives />
      </section>

      {/* Events Section */}
      <section className="home-events-section mt-15 ml-3 mr-3">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-[6px] w-12 bg-[#448800]"></span>
          <h3 className="text-xl sm:text-2xl font-bold uppercase text-green-700 tracking-wide">Events</h3>
        </div>
        <HomeEvents />
      </section>
    </div>
  );
}
