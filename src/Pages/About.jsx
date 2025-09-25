import React, { useRef, useState, useEffect } from "react";
import Footer from "../components/Footer";

export default function About() {
  // Simple team data for the carousel
  const teamMembers = [
    {
      name: "Parthiban",
      role: "Sales Executive",
      img: "/files%20figma/bohemian-man-with-his-arms-crossed%201.png",
      desc: "Sales executives, or sales managers, lead offices of sales associates who offer goods and services to customers. Their primary function is to manage this team to create profits for their company. Sales executives identify prospects, maintain customer relationships and identify ways to grow their sales figures.",
    },
    {
      name: "Priya",
      role: "Marketing Lead",
      img: "/files%20figma/bohemian-man-with-his-arms-crossed%201.png",
      desc: "Marketing lead focused on growth strategies, brand building, and community engagement to expand our impact.",
    },
    {
      name: "Rahul",
      role: "Operations Manager",
      img: "/files%20figma/bohemian-man-with-his-arms-crossed%201.png",
      desc: "Oversees daily operations, optimizes processes, and ensures on-the-ground execution aligns with our mission.",
    },
  ];

  const len = teamMembers.length;
  // Infinite carousel state using clones: [last, ...items, first]
  const [currentIndex, setCurrentIndex] = useState(1); // 1..len
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [animating, setAnimating] = useState(false);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const slides = [teamMembers[len - 1], ...teamMembers, teamMembers[0]];

  const snapIfNeeded = () => {
    const idx = currentIndexRef.current;
    if (idx === 0) {
      setTransitionEnabled(false);
      setCurrentIndex(len);
      requestAnimationFrame(() => setTransitionEnabled(true));
    } else if (idx === len + 1) {
      setTransitionEnabled(false);
      setCurrentIndex(1);
      requestAnimationFrame(() => setTransitionEnabled(true));
    }
  };

  const stepOnce = (dir) => {
    setCurrentIndex((i) => i + dir);
    setTimeout(() => {
      snapIfNeeded();
    }, 320);
  };

  const goSteps = (dir, steps) => {
    if (steps <= 0 || animating) return;
    setAnimating(true);
    const run = (n) => {
      if (n === 0) {
        setAnimating(false);
        return;
      }
      stepOnce(dir);
      setTimeout(() => run(n - 1), 320);
    };
    run(steps);
  };

  const prevTeam = () => goSteps(-1, 1);
  const nextTeam = () => goSteps(1, 1);

  return (
    <main id="about" className="relative min-h-screen bg-white text-slate-800">
      {/* Decorative background SVG with radial fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 left-0 top-[320px] sm:top-[100px] lg:top-[100px] w-[220px] sm:w-[300px] lg:w-[420px] aspect-[447/798] bg-no-repeat bg-left-top"
        style={{
          backgroundImage: "url('/files%20figma/Group%206.svg')",
          backgroundSize: "100% 100%",
          WebkitMaskImage:
            "radial-gradient(circle at center, rgba(255,255,255,1) 35%, rgba(255,255,255,0) 95%)",
          maskImage:
            "radial-gradient(circle at center, rgba(255,255,255,1) 35%, rgba(255,255,255,0) 95%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          opacity: 0.9,
        }}
      />
      <div className="relative z-10">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 md:py-20">
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-slate-900">
              ABOUT US
            </h1>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div>
                <p className="max-w-xl text-slate-600 leading-relaxed">
                  We’re building sustainable value through innovation,
                  community, and accountability. Learn about our mission,
                  vision, and the people who make it happen.
                </p>
              </div>
              <div className="flex md:justify-end">
                <img
                  src="/files%20figma/tamil%20nadu.png"
                  alt="Tamil Nadu map"
                  className="block mx-auto md:mx-0 w-24 sm:w-32 md:w-40 lg:w-48 h-auto object-contain"
                />
              </div>
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_50%_-10%,rgba(68,136,0,0.08),transparent)]"
          />
        </section>

        {/* Mission & Vision */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                Our Mission
              </h2>
              <div className="mt-2 h-1 w-14 rounded-full bg-[#448800]" />
              <p className="mt-3 text-slate-600">
                To empower communities and stakeholders by delivering reliable,
                sustainable solutions that drive measurable impact and long-term
                growth.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                Our Vision
              </h2>
              <div className="mt-2 h-1 w-14 rounded-full bg-[#448800]" />
              <p className="mt-3 text-slate-600">
                A future where innovation and inclusion unlock opportunities for
                everyone—creating resilient ecosystems that thrive.
              </p>
            </article>
          </div>
        </section>

        {/* Team */}
        <section className="mx-auto max-w-7xl px-4 py-6 sm:py-12">
          {/* Banner */}
          <div className="relative rounded-xl overflow-hidden mb-6 md:mb-12 lg:mb-24">
            <img
              src="/files%20figma/photorealistic-view-african-people-harvesting-vegetables-grains%20(1).jpg"
              alt="Our Team"
              className="w-full h-14 md:h-20 lg:h-30 object-cover"
            />
            <div
              className="absolute inset-0 flex items-center px-6"
              style={{
                background:
                  "linear-gradient(90deg, rgba(68,136,0,0.7) 0%, rgba(68,136,0,0) 100%)",
              }}>
              <h2 className="text-white text-xl md:text-2xl font-bold">
                Our Team
              </h2>
            </div>
          </div>

          {/* Team Member Carousel */}
          <div className="relative">
            {/* Slider viewport */}
            <div className="w-full overflow-x-hidden overflow-y-visible">
              <div
                className="flex overflow-visible"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: transitionEnabled
                    ? "transform 300ms ease-out"
                    : "none",
                }}>
                {slides.map((m, idx) => (
                  <div
                    key={idx}
                    className="relative z-10 w-full shrink-0 px-0 overflow-visible">
                    <div
                      className="relative overflow-visible rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-5 items-center pr-24 md:pr-32 lg:pr-40 md:min-h-64 lg:min-h-72"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(68,136,0,1) 0%, rgba(68,136,0,0.2) 100%), #ffffff",
                      }}>
                      {/* Text Section */}
                      <div className="md:col-span-2 text-slate-800">
                        <h3 className="text-2xl font-bold mb-1 text-slate-900">
                          {m.name}
                        </h3>
                        <p className="text-sm font-medium mb-3 text-[#ffffff]">
                          {m.role}
                        </p>
                        <p className="text-sm leading-relaxed text-slate-600">
                          {m.desc}
                        </p>
                      </div>

                      {/* Image Section */}
                    </div>
                    {/* Large overlapping image for md+ placed OUTSIDE the card */}
                    <img
                      src={m.img}
                      alt={m.name}
                      className="hidden md:block absolute right-6 md:right-8 lg:right-12 bottom-0 z-50 w-56 md:w-64 lg:w-72 md:h-[22rem] lg:h-[26rem] object-cover rounded-xl drop-shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <button
              type="button"
              onClick={prevTeam}
              aria-label="Previous team member"
              disabled={animating}
              className="absolute -left-3 md:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 z-30 inline-flex items-center justify-center rounded-full bg-[#448800] text-white w-9 h-9 shadow-md hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed">
              ‹
            </button>
            <button
              type="button"
              onClick={nextTeam}
              aria-label="Next team member"
              disabled={animating}
              className="absolute -right-3 md:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 z-30 inline-flex items-center justify-center rounded-full bg-[#448800] text-white w-9 h-9 shadow-md hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed">
              ›
            </button>

            {/* Dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {teamMembers.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => {
                    if (animating) return;
                    const realIndex =
                      (((currentIndexRef.current - 1) % len) + len) % len;
                    let delta = i - realIndex; // desired movement
                    // choose shortest path around the loop
                    if (delta > 0 && delta > len / 2) delta = delta - len;
                    if (delta < 0 && -delta > len / 2) delta = delta + len;
                    const steps = Math.abs(delta);
                    const dir = delta > 0 ? 1 : -1;
                    goSteps(dir, steps);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === (currentIndex - 1 + len) % len
                      ? "bg-[#448800] w-6"
                      : "bg-slate-300 w-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
