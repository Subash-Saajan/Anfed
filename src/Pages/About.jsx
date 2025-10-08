import React, { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  ];

  const len = teamMembers.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const teamRefs = useRef([]);
  const missionRefs = useRef([]);
  teamRefs.current = [];
  missionRefs.current = [];

  const addTeamRef = (el) => { if (el && !teamRefs.current.includes(el)) teamRefs.current.push(el); };
  const addMissionRef = (el) => { if (el && !missionRefs.current.includes(el)) missionRefs.current.push(el); };

  // GSAP: Section scroll animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from(".about-hero", { y: 50, opacity: 0, duration: 1, ease: "power3.out" });

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

      // Team carousel fade-in
      teamRefs.current.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 1.2,
          delay: i * 0.2,
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Carousel fade function
  const fadeTo = (index) => {
    if (animating) return;
    setAnimating(true);
    const target = ((index % len) + len) % len;
    const currentSlide = teamRefs.current[currentIndex];
    const nextSlide = teamRefs.current[target];

    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power3.out" },
      onComplete: () => {
        setCurrentIndex(target);
        setAnimating(false);
      },
    });

    tl.to(currentSlide, { opacity: 0, pointerEvents: "none" })
      .fromTo(nextSlide, { opacity: 0, pointerEvents: "none" }, { opacity: 1, pointerEvents: "auto" });
  };

  const prevTeam = () => fadeTo(currentIndex - 1);
  const nextTeam = () => fadeTo(currentIndex + 1);

  return (
    <main ref={containerRef} id="about" className="relative min-h-screen bg-white text-slate-800">
      {/* Hero */}
{/* About Us Hero Section */}
<section className="relative isolate overflow-hidden about-hero py-20">
  <div className="mx-auto max-w-7xl px-4 md:px-10 grid md:grid-cols-[6fr_3fr] gap-8 items-center">
    {/* Left side text */}
    <div className="text-left md:pr-12">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
        ABOUT US
      </h1>
      <p className="text-slate-600 leading-relaxed text-base md:text-lg">
        Rooted in the Anuman River basin of the Western Ghats, our journey began
        with the revival of Hanumannathi (Anuman River)—a lifeline for farmers
        across Radhapuram Taluk in Tirunelveli District. Once weakened by
        decades of neglect, the river was restored in 2020 through a remarkable
        collaboration between the District Administration, Anna University, Nam
        Anuman Nathi Society, and hundreds of local volunteers. To carry this
        legacy forward, the Anuman Nathi Society was formally registered as a
        custodian of traditional river basin wisdom. Its mission is to secure
        water resources, drive agriculture-based economic growth, and contribute
        to the state’s trillion-dollar economy vision. By engaging communities
        in water governance and working with research institutions, academics,
        and technical experts, the Society anchors sustainability at its core.
        As a natural extension, the Anuman Nathi FED Farmer Producer Company Ltd
        (ANFED FPO) was formed under the Union Government’s 10,000 FPO Scheme,
        supported by NAFED and mentored by Viruthai Millets CBBO. Today, ANFED
        FPO is more than a farmer collective—it is a movement to make
        agriculture dignified, sustainable, and economically viable. Through
        ANFED MART, we promote natural farming, enable value addition, and
        connect farmers directly with consumers, while safeguarding the
        ecological balance of our river basin.
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
        <article ref={addMissionRef} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Our Mission</h2>
          <div className="mt-2 h-1 w-14 rounded-full bg-[#448800]" />
          <p className="mt-3 text-slate-600">
          Our mission is to enhance farmers’ income through collective marketing and value addition, while promoting natural, chemical-free farming rooted in traditional wisdom. We aim to build direct market linkages that eliminate middlemen, and ensure every product reflects transparency, traceability, and trust          </p>
        </article>
        <article ref={addMissionRef} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Our Vision</h2>
          <div className="mt-2 h-1 w-14 rounded-full bg-[#448800]" />
          <p className="mt-3 text-slate-600">
          To build a self-reliant, sustainable rural economy in the Anuman Nathi sub-basin by promoting natural farming, local enterprise, and direct market linkages—ensuring that agriculture becomes a dignified and economically viable livelihood.
          </p>
        </article>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:py-12 relative">
        <div className="relative rounded-xl overflow-hidden mb-6">
          <img
            src="/files%20figma/photorealistic-view-african-people-harvesting-vegetables-grains%20(1).jpg"
            alt="Our Team"
            className="w-full h-14 md:h-20 lg:h-30 object-cover"
          />
          <div className="absolute inset-0 flex items-center px-6" style={{ background: "linear-gradient(90deg, rgba(68,136,0,0.7) 0%, rgba(68,136,0,0) 100%)" }}>
            <h2 className="text-white text-xl md:text-2xl font-bold">Our Team</h2>
          </div>
        </div>

        <div className="relative w-full overflow-visible md:h-[22rem] lg:h-[20rem]">
          {teamMembers.map((m, idx) => (
            <div key={idx} ref={addTeamRef} className={`absolute inset-0 px-0`} style={{ opacity: idx === currentIndex ? 1 : 0 }}>
              <div className="relative h-full overflow-visible rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-5 items-center pr-24 md:pr-32 lg:pr-40" style={{ background: "linear-gradient(90deg, rgba(68,136,0,1) 0%, rgba(68,136,0,0.2) 100%), #ffffff" }}>
                <div className="md:col-span-2 text-slate-800">
                  <h3 className="text-2xl font-bold mb-1 text-slate-900">{m.name}</h3>
                  <p className="text-sm font-medium mb-3 text-[#ffffff]">{m.role}</p>
                  <p className="text-sm leading-relaxed text-slate-600">{m.desc}</p>
                </div>
              </div>
              <img src={m.img} alt={m.name} className="hidden md:block absolute right-6 md:right-8 lg:right-12 bottom-0 z-50 w-56 md:w-64 lg:w-72 md:h-[22rem] lg:h-[26rem] object-cover rounded-xl drop-shadow-lg" />
            </div>
          ))}
        </div>

        {/* Controls */}
        <button onClick={prevTeam} disabled={animating} className="absolute -left-10 md:-left-14 lg:-left-16 top-1/2 -translate-y-1/2 z-60 w-9 h-9 rounded-full bg-[#448800] text-white flex items-center justify-center shadow-md">‹</button>
        <button onClick={nextTeam} disabled={animating} className="absolute -right-10 md:-right-14 lg:-right-16 top-1/2 -translate-y-1/2 z-60 w-9 h-9 rounded-full bg-[#448800] text-white flex items-center justify-center shadow-md">›</button>

        {/* Dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {teamMembers.map((_, i) => (
            <button key={i} onClick={() => fadeTo(i)} className={`h-2 rounded-full ${i === currentIndex ? "bg-[#448800] w-6" : "bg-slate-300 w-2"}`} />
          ))}
        </div>
      </section>
    </main>
  );
}
