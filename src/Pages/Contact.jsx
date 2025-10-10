import React, { useState, useRef, useLayoutEffect } from "react";
import logo from "../assets/Logo.png";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { gsap } from "gsap";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // Refs for animation
  const elementsRef = useRef([]);
  elementsRef.current = [];
  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) elementsRef.current.push(el);
  };

  // Simple bottom-to-top animation
  useLayoutEffect(() => {
    gsap.from(elementsRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    });
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
    <div className="container mx-auto px-12 py-12" ref={addToRefs}>
      {/* Contact Info */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-28 mb-16 px-8" ref={addToRefs}>
        <div className="text-center md:text-left max-w-2xl" ref={addToRefs}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" ref={addToRefs}>
            Contact Us
          </h1>
          <div className="flex flex-col gap-3 text-sm text-slate-600" ref={addToRefs}>
            <div className="flex items-center gap-3 justify-center md:justify-start" ref={addToRefs}>
              <FaMapMarkerAlt className="text-[#448800] w-6 h-6" />
              <span className="text-base">Thirunelveli, Tamilnadu</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start" ref={addToRefs}>
              <FaPhoneAlt className="text-[#448800] w-6 h-6" />
              <span className="text-base">+91 9999999999</span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 md:ml-12" ref={addToRefs}>
          <img src={logo} alt="logo" className="w-44 md:w-72 object-contain" />
        </div>
      </div>

      {/* Form */}
      <div className="bg-slate-100 p-6 rounded-2xl" ref={addToRefs}>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Left: form */}
          <div className="space-y-4" ref={addToRefs}>
            <h2 className="text-xl font-semibold" ref={addToRefs}>Get in touch</h2>
            <form className="space-y-3" onSubmit={handleSubmit} ref={addToRefs}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  className="w-full p-3 border rounded-md bg-slate-50"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  ref={addToRefs}
                />
                <input
                  className="w-full p-3 border rounded-md bg-slate-50"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  ref={addToRefs}
                />
              </div>
              <input
                className="w-full p-3 border rounded-md bg-slate-50"
                placeholder="Mobile Number"
                type="tel"
                inputMode="numeric"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                pattern="[0-9]{10}"
                title="Please enter a 10-digit mobile number"
                ref={addToRefs}
              />
              <input
                className="w-full p-3 border rounded-md bg-slate-50"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                ref={addToRefs}
              />
              <textarea
                className="w-full p-3 border rounded-md bg-slate-50 min-h-[140px] resize-none"
                placeholder="Message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                ref={addToRefs}
              />
              <div className="flex items-center gap-3" ref={addToRefs}>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#448800] text-white px-6 py-2 rounded-md font-semibold"
                  ref={addToRefs}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
                {status === "ok" && <div className="text-sm text-green-600">Thank you! We’ll get back to you within 24 hours.</div>}
                {status === "error" && <div className="text-sm text-red-600">Something went wrong — try again.</div>}
              </div>
            </form>
          </div>

          {/* Right: Google Map */}
          <div className="p-3" ref={addToRefs}>
            <div className="w-full h-full rounded-lg overflow-hidden border" ref={addToRefs}>
              <iframe
                title="ANFED FPO"
                className="w-full h-[360px] md:h-full"
                src="https://www.google.com/maps?q=8.278833,77.566722&output=embed"
                allowFullScreen
                loading="lazy"
                ref={addToRefs}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
