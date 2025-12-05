import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import Banner2 from "../assets/Banner2.png";
import Banner3 from "../assets/Banner3.png";
import Banner4 from "../assets/Banner4.png";
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

const heroImages = [Banner4, Banner2, Banner3];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

      // Overview cards - no initial animation, just subtle hover handled by CSS

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


    // Card hover effects handled by CSS in OverviewCards component

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
    <div ref={containerRef} className="mx-4 sm:mx-6 lg:mx-8 overflow-hidden">
      {/* Hero Section - Carousel */}
      <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden mt-6 shadow-2xl">
        {/* Carousel Images */}
        <div ref={heroImageRef} className="absolute inset-0">
          {heroImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Hero ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-16">
          {/* Top badge */}
          <div ref={heroSubtitleRef} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
              <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z"/>
                <path d="M12 22V12"/>
              </svg>
              <span className="text-sm sm:text-base font-medium italic">Soil to Soul</span>
            </span>
          </div>

          {/* Main heading */}
          <div ref={heroHeadingRef} className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Anuman Nadhi Fed
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-white/80 mt-2">
              Farmer Producer Company Ltd
            </h2>
            <p className="text-sm sm:text-base text-white/60 mt-4 max-w-lg leading-relaxed hidden sm:block">
              Empowering farmers through sustainable agriculture, natural farming practices, and direct market connections.
            </p>
          </div>

          {/* CTA Buttons */}
          <div ref={buttonRef} className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button className="group flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm sm:text-base font-semibold py-3 px-6 sm:px-8 rounded-full shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300">
              About Us
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm sm:text-base font-medium py-3 px-6 rounded-full hover:bg-white/20 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Watch Story
            </button>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      {/* Overview Section */}
      <section className="mt-12 sm:mt-16 px-2">
        <div className="mb-8">
          {/* Modern Section Header */}
          <div className="flex items-center gap-4 mb-4" ref={overviewHeaderRef}>
            <div className="flex items-center gap-2">
              <span className="h-10 w-1.5 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></span>
              <span className="h-7 w-1 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></span>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Overview</h3>
              <p className="text-sm text-gray-500">What we do</p>
            </div>
          </div>

          <p className="text-lg sm:text-xl font-semibold text-gray-800 mt-4" ref={overviewTextRef}>
            Rooted in Tradition, Growing for the Future
          </p>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl" ref={overviewParaRef}>
            Born from the revival of the Anuman River, ANFED FPO unites farmers to promote sustainable, natural, and herbal farming. We bridge the gap between farmers and consumers through direct market linkages, ensuring fair prices, transparency, and trust.
          </p>
        </div>
        <OverviewCards addRef={addOverviewRef} />
      </section>

      {/* Statistics Cards Section */}
      <section className="mt-16 sm:mt-20 px-2">
        {/* Section Header for Stats */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="h-10 w-1.5 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></span>
            <span className="h-7 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full"></span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Our Impact</h3>
            <p className="text-sm text-gray-500">Numbers that matter</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[Rectangle34, Rectangle35, Rectangle36, Rectangle37].map((img, i) => (
            <StatisticsCard
              key={i}
              ref={addStatsRef}
              imageSrc={img}
              number={[400, 10, 50, 22][i]}
              description={[
                "Farmers empowered through natural farming",
                "Outlets under ANFED MART",
                "Soil tests conducted",
                "Waterbodies revived in the Anuman Nathi basin",
              ][i]}
              dataTarget={[400, 10, 50, 22][i]}
              buttonText={[
                "Meet Our Farmers",
                "Visit ANFED Mart",
                "View Services",
                "See Gallery",
              ][i]}
              linkTo={[
                "/farmers",
                "/mart",
                "/services",
                "/gallery",
              ][i]}
            />
          ))}
        </div>
      </section>

      {/* Core Values & Initiatives */}
      <section>
        <CoreValues />
        <Initiatives />
      </section>

      {/* Events Section */}
      <section className="home-events-section mt-16 sm:mt-20 px-2 mb-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="h-10 w-1.5 bg-gradient-to-b from-cyan-500 to-teal-600 rounded-full"></span>
            <span className="h-7 w-1 bg-gradient-to-b from-cyan-400 to-teal-500 rounded-full"></span>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Events</h3>
            <p className="text-sm text-gray-500">Latest happenings</p>
          </div>
        </div>
        <HomeEvents />
      </section>
    </div>
  );
}
