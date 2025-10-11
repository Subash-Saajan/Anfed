import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import logo from "../assets/Logo.png";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // Refs
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const imageRef = useRef(null);
  const formRef = useRef(null);
  const fieldsRef = useRef([]);
  const buttonRef = useRef(null);
  const mapRef = useRef(null);

  fieldsRef.current = [];
  const addFieldRef = (el) => {
    if (el && !fieldsRef.current.includes(el)) fieldsRef.current.push(el);
  };

  // Animate all elements from bottom on page load
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });

      tl.from(containerRef.current, { opacity: 0, y: 30 })
        .from(titleRef.current, { opacity: 0, y: 30 }, "-=0.6")
        .from(infoRef.current, { opacity: 0, y: 30 }, "-=0.5")
        .from(imageRef.current, { opacity: 0, y: 30 }, "-=0.5");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate form fields, button, and map on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (fieldsRef.current.length) {
        gsap.from(fieldsRef.current, {
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      if (buttonRef.current) {
        gsap.from(buttonRef.current, {
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 90%",
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      if (mapRef.current) {
        gsap.from(mapRef.current, {
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 85%",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!name.trim() || !email.trim() || !mobile.trim() || !subject.trim()) {
      setStatus("error");
      return;
    }
    setLoading(true);
    try {
      const submitFormData = new FormData();
      submitFormData.append("name", name);
      submitFormData.append("email", email);
      submitFormData.append("mobile", mobile);
      submitFormData.append("message", message);
      submitFormData.append("_replyto", email);
      submitFormData.append("_subject", subject || `New message from ${name}`);
      submitFormData.append("_template", "table");
      submitFormData.append("_captcha", "false");

      const response = await fetch(
        "https://formsubmit.co/ajax/sarveswaranmg@gmail.com",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: submitFormData,
        }
      );

      let result;
      try {
        result = await response.json();
      } catch {
        const text = await response.text();
        throw new Error(`Form submit failed (${response.status}): ${text}`);
      }

      if (!response.ok || !(result && (result.success === "true" || result.success === true))) {
        throw new Error(`Form submit failed: ${JSON.stringify(result)}`);
      }

      setName("");
      setEmail("");
      setMobile("");
      setSubject("");
      setMessage("");
      setStatus("ok");
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="container mx-auto px-12 py-12">
      {/* Contact Info */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-28 mb-16 px-8">
        <div ref={infoRef} className="text-center md:text-left max-w-2xl">
          <h1 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4">
            Contact Us
          </h1>
          <div className="flex flex-col gap-3 text-sm text-slate-600">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FaMapMarkerAlt className="text-[#448800] w-6 h-6" />
              <span className="text-base">Thirunelveli, Tamilnadu</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FaPhoneAlt className="text-[#448800] w-6 h-6" />
              <span className="text-base">+91 9999999999</span>
            </div>
          </div>
        </div>
        <div ref={imageRef} className="flex-shrink-0 md:ml-12">
          <img src={logo} alt="logo" className="w-44 md:w-72 object-contain" />
        </div>
      </div>

      {/* Form */}
      <div className="bg-slate-100 p-6 rounded-2xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Left: form */}
          <div ref={formRef} className="space-y-4">
            <h2 className="text-xl font-semibold">Get in touch</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  ref={addFieldRef}
                  className="w-full p-3 border rounded-md bg-slate-50"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  ref={addFieldRef}
                  className="w-full p-3 border rounded-md bg-slate-50"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <input
                ref={addFieldRef}
                className="w-full p-3 border rounded-md bg-slate-50"
                placeholder="Mobile Number"
                type="tel"
                inputMode="numeric"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                pattern="[0-9]{10}"
                title="Please enter a 10-digit mobile number"
              />
              <input
                ref={addFieldRef}
                className="w-full p-3 border rounded-md bg-slate-50"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <textarea
                ref={addFieldRef}
                className="w-full p-3 border rounded-md bg-slate-50 min-h-[140px] resize-none"
                placeholder="Message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex items-center gap-3">
                <button
                  ref={buttonRef}
                  type="submit"
                  disabled={loading}
                  className="bg-[#448800] text-white px-6 py-2 rounded-md font-semibold"
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
                {status === "ok" && (
                  <div className="text-sm text-green-600">
                    Thank you! We’ll get back to you within 24 hours.
                  </div>
                )}
                {status === "error" && (
                  <div className="text-sm text-red-600">
                    Something went wrong — try again.
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Right: Google Map */}
          <div ref={mapRef} className="p-3">
            <div className="w-full h-full rounded-lg overflow-hidden border">
              <iframe
                title="ANFED FPO"
                className="w-full h-[360px] md:h-full"
                src="https://www.google.com/maps?q=8.278833,77.566722&output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
