import { useState } from "react";

const services = [
  {
    id: "soil-testing",
    title: "Soil Testing",
    subtitle: "Know Your Land",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z"/>
        <path d="M12 22V12"/>
        <path d="M8 12c0-3 2-5.5 4-7"/>
      </svg>
    ),
    gradient: "from-emerald-500 to-green-600",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1600&auto=format&fit=crop",
    desc: {
      intro: `Understanding your soil is the first step toward better farming. At Anuman Nathi FED Farmer Producer Company Ltd., we operate a dedicated Soil Testing Lab in collaboration with SATBLOOM to help farmers make informed cultivation decisions.`,
      details: `Before every crop cycle, our team collects soil samples from member farms, analyzes nutrient composition, and provides customized fertilizer and crop recommendations. This ensures improved yield, cost efficiency, and long-term soil health.`,
      list: [
        "Collect soil samples from farmers' fields across the Anuman Nathi basin",
        "Test key soil parameters including pH, nitrogen, phosphorus, potassium, and micronutrients",
        "Provide digital and printed Soil Health Certificates with personalized recommendations",
        "Guide farmers in selecting suitable crops and balanced fertilizer use for sustainable productivity",
      ],
      closing: `Our soil testing service empowers farmers to optimize inputs, enhance productivity, and maintain ecological balance.`,
    },
    stats: { tests: "50+", farmers: "200+", accuracy: "99%" },
  },
  {
    id: "anfed-mart",
    title: "ANFED Mart",
    subtitle: "Farm to Table",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    gradient: "from-teal-500 to-cyan-600",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop",
    desc: {
      intro: `ANFED Mart is an initiative of Anuman Nathi FED Farmer Producer Company Ltd., designed to create a direct bridge between farmers and consumers. Rooted in our mission to enhance farmer income and promote sustainable agriculture, the mart focuses on fresh vegetables and locally made value-added products from the Anuman Nathi basin.`,
      details: `The mart serves as a farmers' collective outlet, offering seasonal vegetables, pickles, herbal powders, and other processed products prepared by our member farmers. It ensures fair pricing, quality assurance, and market visibility for local produce.`,
      list: [
        "Direct farmer-to-consumer link for fresh produce",
        "Focus on value-added local products",
        "Ensures fair pricing and quality for all goods",
        "Promotes sustainable and inclusive rural economy",
      ],
      closing: `Through ANFED Mart, we envision a community-driven marketplace that supports both farm productivity and rural entrepreneurship.`,
    },
    stats: { outlets: "10+", products: "50+", farmers: "100+" },
  },
  {
    id: "farm-pond",
    title: "Farm Pond Development",
    subtitle: "Water Security",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-600",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
    desc: {
      intro: `To enhance water availability and promote sustainable agriculture, Anuman Nathi FED Farmer Producer Company Ltd. is implementing a Farm Pond Creation Project in Vilathikulam Block, supported by the HCL Foundation.`,
      details: `The project helps farmers store rainwater and runoff in scientifically designed farm ponds, enabling an additional cropping cycle even during dry months. Each pond is lined with durable tarpaulin sheets to minimize seepage and ensure year-round water retention.`,
      list: [
        "Scientific design for efficient rainwater harvesting",
        "Tarpaulin lining to prevent seepage and ensure water retention",
        "Supports year-round irrigation and additional cropping",
        "Promotes resilience against drought conditions",
      ],
      closing: `Through this initiative, farmers are empowered to improve crop productivity, reduce dependence on external water sources, and strengthen their resilience to drought.`,
    },
    stats: { ponds: "30+", capacity: "5000L", villages: "15+" },
  },
  {
    id: "training",
    title: "Training & Capacity Building",
    subtitle: "Knowledge Empowerment",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    gradient: "from-amber-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=1600&auto=format&fit=crop",
    desc: {
      intro: `Knowledge is the foundation of sustainable farming. Our Training & Capacity Building programs equip farmers with the skills and knowledge they need to adopt modern, eco-friendly farming practices.`,
      details: `We conduct regular workshops, field demonstrations, and hands-on training sessions covering natural farming techniques, post-harvest handling, and outlet management. Our programs are designed to be practical, accessible, and tailored to local needs.`,
      list: [
        "Natural and organic farming techniques",
        "Post-harvest handling and storage best practices",
        "Value addition and processing methods",
        "Financial literacy and market linkage training",
      ],
      closing: `By investing in farmer education, we're building a community of knowledgeable, empowered agricultural entrepreneurs.`,
    },
    stats: { workshops: "25+", trained: "300+", topics: "15+" },
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const s = services[active];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white overflow-hidden">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              Expert Solutions
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Our Services
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 max-w-2xl">
            Comprehensive agricultural support from soil to market, empowering farmers at every step of their journey.
          </p>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      {/* Service Navigation Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {services.map((service, idx) => (
            <button
              key={service.id}
              onClick={() => setActive(idx)}
              className={`group relative p-4 sm:p-6 rounded-2xl transition-all duration-300 text-left ${
                idx === active
                  ? "bg-white shadow-xl ring-2 ring-green-500"
                  : "bg-white shadow-lg hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-3 sm:mb-4 ${
                idx === active ? "scale-110" : "group-hover:scale-105"
              } transition-transform duration-300 shadow-lg`}>
                {service.icon}
              </div>

              {/* Title */}
              <h3 className={`font-bold text-sm sm:text-base mb-1 ${
                idx === active ? "text-green-700" : "text-gray-800 group-hover:text-green-600"
              } transition-colors`}>
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">{service.subtitle}</p>

              {/* Active indicator */}
              {idx === active && (
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r ${service.gradient} rounded-full`}></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Image & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${s.gradient} mb-2`}>
                  {s.subtitle}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {s.title}
                </h2>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Impact Numbers</h4>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(s.stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}>
                      {value}
                    </div>
                    <div className="text-xs text-gray-500 capitalize mt-1">{key}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {s.id === "anfed-mart" && (
                <a href="/mart" className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-r ${s.gradient} text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}>
                  Visit ANFED Mart
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              )}
              <a href="/contact" className={`flex-1 flex items-center justify-center gap-2 ${s.id === "anfed-mart" ? "bg-white border-2 border-gray-200 text-gray-700 hover:border-green-500 hover:text-green-600" : `bg-gradient-to-r ${s.gradient} text-white shadow-lg hover:shadow-xl`} font-semibold py-3 px-6 rounded-full transition-all duration-300`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                Contact Us
              </a>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className={`h-8 w-1.5 bg-gradient-to-b ${s.gradient} rounded-full`}></span>
                  <span className={`h-6 w-1 bg-gradient-to-b ${s.gradient} rounded-full opacity-60`}></span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">About This Service</h3>
                  <p className="text-sm text-gray-500">What we offer</p>
                </div>
              </div>

              {/* Intro */}
              <p className="text-gray-700 leading-relaxed mb-6">
                {s.desc.intro}
              </p>

              {/* Details */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {s.desc.details}
              </p>

              {/* Features List */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                  Key Features
                </h4>
                <ul className="space-y-3">
                  {s.desc.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${s.gradient} flex items-center justify-center mt-0.5`}>
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Closing */}
              <div className={`p-4 rounded-xl bg-gradient-to-r ${s.gradient} bg-opacity-10`} style={{ background: `linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))` }}>
                <p className="text-gray-700 font-medium italic">
                  "{s.desc.closing}"
                </p>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <h5 className="font-semibold text-gray-800">Quick Turnaround</h5>
                </div>
                <p className="text-sm text-gray-600">Fast and efficient service delivery to meet your farming schedule.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-teal-500">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  <h5 className="font-semibold text-gray-800">Quality Assured</h5>
                </div>
                <p className="text-sm text-gray-600">All services follow strict quality standards for best results.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
