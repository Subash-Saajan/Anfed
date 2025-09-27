import React, { useState } from "react";

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
  const [currentIndex, setCurrentIndex] = useState(0); // 0..len-1
  const [animating, setAnimating] = useState(false);

  const fadeTo = (index) => {
    if (animating) return;
    setAnimating(true);
    // wrap around using modulo
    const target = ((index % len) + len) % len;
    setCurrentIndex(target);
    setTimeout(() => setAnimating(false), 320);
  };

  const prevTeam = () => fadeTo(currentIndex - 1);
  const nextTeam = () => fadeTo(currentIndex + 1);

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
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-slate-900 text-left">
              ABOUT US
            </h1>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 place-items-center gap-4 sm:gap-6">
              <div className="text-center">
                <p className="max-w-xl text-slate-600 leading-relaxed">
                  We’re building sustainable value through innovation,
                  community, and accountability. Learn about our mission,
                  vision, and the people who make it happen.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="/files%20figma/tamil%20nadu.png"
                  alt="Tamil Nadu map"
                  className="block mx-auto w-28 sm:w-40 md:w-56 lg:w-64 h-auto object-contain"
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
          <div className="relative rounded-xl overflow-hidden mb-1 md:mb-15 lg:mb-20">
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
              }}
            >
              <h2 className="text-white text-xl md:text-2xl font-bold ">
                Our Team
              </h2>
            </div>
          </div>

          {/* Team Member Carousel */}
          <div className="relative">
            {/* Crossfade viewport */}
            <div className="relative w-full overflow-visible md:h-[22rem] lg:h-[20rem]">
              {teamMembers.map((m, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 px-0 transition-opacity duration-300 ease-out ${
                    idx === currentIndex
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div
                    className="relative h-full overflow-visible rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-5 items-center pr-24 md:pr-32 lg:pr-40"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(68,136,0,1) 0%, rgba(68,136,0,0.2) 100%), #ffffff",
                    }}
                  >
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
                    {/* Image Section (mobile only) */}
                  </div>
                  {/* Large overlapping image for md+ placed OUTSIDE the card, sibling to card */}
                  <img
                    src={m.img}
                    alt={m.name}
                    className="hidden md:block absolute right-6 md:right-8 lg:right-12 bottom-0 z-50 w-56 md:w-64 lg:w-72 md:h-[22rem] lg:h-[26rem] object-cover rounded-xl drop-shadow-lg"
                  />
                </div>
              ))}
            </div>

            {/* Controls */}
            <button
              type="button"
              onClick={prevTeam}
              aria-label="Previous team member"
              disabled={animating}
              className="absolute -left-10 md:-left-14 lg:-left-16 top-1/2 -translate-y-1/2 z-60 inline-flex items-center justify-center rounded-full bg-[#448800] text-white w-9 h-9 shadow-md hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={nextTeam}
              aria-label="Next team member"
              disabled={animating}
              className="absolute -right-10 md:-right-14 lg:-right-16 top-1/2 -translate-y-1/2 z-60 inline-flex items-center justify-center rounded-full bg-[#448800] text-white w-9 h-9 shadow-md hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              ›
            </button>

            {/* Dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {teamMembers.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => fadeTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? "bg-[#448800] w-6" : "bg-slate-300 w-2"
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
