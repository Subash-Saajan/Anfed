import { useState } from "react";
import emailjs from "emailjs-com";
import logo from "../assets/logo.png";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(""); // new mobile state
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | "ok" | "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!name.trim() || !email.trim() || !message.trim() || !mobile.trim()) {
      setStatus("error");
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        "your_service_id", // 👉 from EmailJS
        "your_template_id", // 👉 from EmailJS
        {
          from_name: name,
          from_email: email,
          from_mobile: mobile, // send mobile number
          subject: subject,
          message: message,
          to_email: "subashsaajan@gmail.com", // your email
        },
        "your_public_key" // 👉 from EmailJS
      );

      setName("");
      setEmail("");
      setMobile(""); // reset mobile
      setSubject("");
      setMessage("");
      setStatus("ok");
    } catch (err) {
      console.error("Email send error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-12 py-12">
      {/* Contact Info */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-28 mb-16 px-8">
        <div className="text-center md:text-left max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
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
        <div className="flex-shrink-0 md:ml-12">
          <img src={logo} alt="logo" className="w-44 md:w-72 object-contain" />
        </div>
      </div>

      {/* Form */}
      <div className="bg-slate-100 p-6 rounded-2xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Left: form */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Get in touch</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  className="w-full p-3 border rounded-md bg-slate-50"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  className="w-full p-3 border rounded-md bg-slate-50"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

                <input
                className="w-full p-3 border rounded-md bg-slate-50"
                placeholder="Mobile Number"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                pattern="\d{10}"  // ensures exactly 10 digits
                title="Please enter a 10-digit mobile number"
                />


              <input
                className="w-full p-3 border rounded-md bg-slate-50"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <textarea
                className="w-full p-3 border rounded-md bg-slate-50 min-h-[140px] resize-none"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#448800] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#3b7700] disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Submit"}
                </button>

                {status === "ok" && (
                  <div className="text-sm text-green-600">
                    Message sent — thank you.
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
          <div className="p-3">
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
