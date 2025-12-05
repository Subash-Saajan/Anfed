import React from "react";

const initiatives = [
  {
    title: "ANFED MART",
    subtitle: "Direct Market Linkages",
    description: "Daily farm procurement, distribution network, pesticide-free section.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    pattern: "market",
  },
  {
    title: "Training & Capacity Building",
    subtitle: "Knowledge Empowerment",
    description: "Natural farming, post-harvest handling, outlet management.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    pattern: "training",
  },
  {
    title: "Outreach Programs",
    subtitle: "Community Connect",
    description: "Farmer field days, awareness camps, village-level events.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
    pattern: "outreach",
  },
  {
    title: "Value Addition & Enterprises",
    subtitle: "Farm to Product",
    description: "Pickles, Herbal powders, oils, processing ventures.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    gradient: "from-lime-500 via-green-500 to-emerald-500",
    pattern: "enterprise",
  },
];

export default function Initiatives() {
  return (
    <section className="hidden sm:block mt-16 ml-3 mr-3">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <span className="h-8 w-1.5 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full"></span>
          <span className="h-6 w-1 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></span>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Our Initiatives
          </h3>
          <p className="text-sm text-gray-500 mt-1">Programs driving rural transformation</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        {initiatives.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Top gradient bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${item.gradient}`}></div>

            <div className="p-3 sm:p-6 flex flex-col sm:flex-row gap-2 sm:gap-5">
              {/* Icon container */}
              <div className={`flex-shrink-0 w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-8 sm:[&>svg]:h-8`}>
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-xs sm:text-lg font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300 leading-tight mb-1">
                  {item.title}
                </h4>
                <span className={`hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r ${item.gradient} text-white mb-2`}>
                  {item.subtitle}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed hidden sm:block">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute -bottom-8 -right-8 w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-gradient-to-br from-green-100 to-emerald-50 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
