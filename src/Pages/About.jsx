import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion as Motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
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
    {
      name: "Anitha",
      role: "Quality Assurance",
      img: "/files%20figma/bohemian-man-with-his-arms-crossed%201.png",
      desc: "Ensures product standards, auditing processes, and maintaining consistency across the value chain.",
    },
    {
      name: "Karthik",
      role: "Supply Chain Lead",
      img: "/files%20figma/bohemian-man-with-his-arms-crossed%201.png",
      desc: "Manages procurement, logistics, and last-mile distribution for efficient market linkages.",
    },
    {
      name: "Meera",
      role: "Finance & Compliance",
      img: "/files%20figma/bohemian-man-with-his-arms-crossed%201.png",
      desc: "Oversees budgeting, reporting, and statutory compliance with transparency and rigor.",
    },
  ];

  const containerRef = useRef(null);
  const missionRefs = useRef([]);
  missionRefs.current = [];
  const addMissionRef = (el) => {
    if (el && !missionRefs.current.includes(el)) missionRefs.current.push(el);
  };

  // GSAP: Section scroll animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from(".about-hero", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Mission & Vision fade-in on scroll
      missionRefs.current.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // (Team section now uses Framer Motion for its own animation)
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // (Removed GSAP-driven team carousel; now using Framer Motion center-out layout)

  return (
    <main
      ref={containerRef}
      id="about"
      className="relative min-h-screen bg-white text-slate-800"
    >
      {/* Hero */}
      {/* About Us Hero Section */}
      <section className="relative isolate overflow-hidden about-hero py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-10 grid md:grid-cols-[6fr_3fr] gap-8 items-center">
          {/* Left side text */}
          <div className="text-left md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              ABOUT US
            </h1>
            <p className="text-slate-600 leading-relaxed text-base md:text-md">
              Rooted in the Anuman River basin of the Western Ghats, our journey
              began with the revival of Hanumannathi (Anuman River)—a lifeline
              for farmers across Radhapuram Taluk in Tirunelveli District. Once
              weakened by decades of neglect, the river was restored in 2020
              through a remarkable collaboration between the District
              Administration, Anna University, Nam Anuman Nathi Society, and
              hundreds of local volunteers. To carry this legacy forward, the
              Anuman Nathi Society was formally registered as a custodian of
              traditional river basin wisdom. Its mission is to secure water
              resources, drive agriculture-based economic growth, and contribute
              to the state’s trillion-dollar economy vision. By engaging
              communities in water governance and working with research
              institutions, academics, and technical experts, the Society
              anchors sustainability at its core. As a natural extension, the
              Anuman Nathi FED Farmer Producer Company Ltd (ANFED FPO) was
              formed under the Union Government’s 10,000 FPO Scheme, supported
              by NAFED and mentored by Viruthai Millets CBBO. Today, ANFED FPO
              is more than a farmer collective—it is a movement to make
              agriculture dignified, sustainable, and economically viable.
              Through ANFED MART, we promote natural farming, enable value
              addition, and connect farmers directly with consumers, while
              safeguarding the ecological balance of our river basin.
            </p>
          </div>

          {/* Right side image */}
          <div className="flex justify-center items-center">
            <img
              src="/files%20figma/tamil%20nadu.png"
              alt="Tamil Nadu map"
              className="w-32 sm:w-44 md:w-60 lg:w-72 h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12 grid md:grid-cols-2 gap-6">
        <article
          ref={addMissionRef}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-slate-900">Our Mission</h2>
          <div className="mt-2 h-1 w-14 rounded-full bg-[#448800]" />
          <p className="mt-3 text-slate-600">
            Our mission is to enhance farmers’ income through collective
            marketing and value addition, while promoting natural, chemical-free
            farming rooted in traditional wisdom. We aim to build direct market
            linkages that eliminate middlemen, and ensure every product reflects
            transparency, traceability, and trust{" "}
          </p>
        </article>
        <article
          ref={addMissionRef}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-slate-900">Our Vision</h2>
          <div className="mt-2 h-1 w-14 rounded-full bg-[#448800]" />
          <p className="mt-3 text-slate-600">
            To build a self-reliant, sustainable rural economy in the Anuman
            Nathi sub-basin by promoting natural farming, local enterprise, and
            direct market linkages—ensuring that agriculture becomes a dignified
            and economically viable livelihood.
          </p>
        </article>
      </section>

      {/* Team - Center-Out Carousel (Framer Motion) */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Our Team
          </h2>
          <p className="text-slate-600 mt-2">Meet the people behind ANFED</p>
        </div>

        <div
          className="relative flex justify-center items-center w-full overflow-hidden px-2 sm:px-4 md:px-6"
          style={{ minHeight: "26rem" }}
        >
          {teamMembers.map((m, i) => {
            const center = (teamMembers.length - 1) / 2;
            const offset = i - center;
            const abs = Math.abs(offset);
            // Wider spacing and curved arc
            const spread = 220; // px spacing horizontally
            const curve = 24; // px vertical per step
            const yOffset = abs * curve; // lower towards edges for an arc
            const zIndex = 100 - abs; // center above
            return (
              <Motion.div
                key={i}
                initial={{ scale: 0.9, opacity: 0, x: 0, y: 0 }}
                animate={{
                  scale: 1 - abs * 0.08,
                  opacity: 1 - abs * 0.18,
                  x: offset * spread,
                  y: yOffset,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                  delay: abs * 0.06,
                }}
                className="absolute top-0"
                style={{ zIndex }}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-40 h-56 sm:w-48 sm:h-64 md:w-56 md:h-72 object-cover rounded-3xl shadow-lg"
                  />
                  <div className="text-center mt-3">
                    <p className="text-slate-900 font-semibold">{m.name}</p>
                    <p className="text-[#448800] text-sm">{m.role}</p>
                  </div>
                </div>
              </Motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
