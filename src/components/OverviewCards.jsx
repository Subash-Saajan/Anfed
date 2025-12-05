// src/components/OverviewCards.jsx
import React, { useRef } from "react";

const overviewData = [
  {
    title: "Market Access & Value Addition",
    description:
      "Strengthening collective marketing, establishing direct farmer-to-consumer linkages, and enhancing income through value-added agri and herbal products.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/>
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
      </svg>
    ),
    gradient: "from-emerald-500 to-green-600",
  },
  {
    title: "Promotion of Natural & Herbal Farming",
    description:
      "Encouraging chemical-free agriculture, promoting herbal cultivation and collection, and reviving traditional practices for long-term sustainability.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 10a6 6 0 0 0 6-6 6 6 0 0 0-6 6"/>
        <path d="M12 10a6 6 0 0 1-6-6 6 6 0 0 1 6 6"/>
        <path d="M12 10v12"/>
        <path d="M12 22c-4 0-6-2-6-6"/>
        <path d="M12 22c4 0 6-2 6-6"/>
      </svg>
    ),
    gradient: "from-lime-500 to-emerald-600",
  },
  {
    title: "Sustainable Livelihoods & Rural Enterprises",
    description:
      "Creating employment and entrepreneurship opportunities for farmers, women, and youth through decentralized agro-based units and rural enterprises.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    gradient: "from-teal-500 to-green-600",
  },
  {
    title: "Eco-Restoration & Resource Management",
    description:
      "Linking river and tank restoration with improved farming systems, while ensuring traceability, transparency, and long-term ecological balance.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c4-2.3 7-7.4 7-12a7 7 0 1 0-14 0c0 4.6 3 9.7 7 12z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    title: "Precision Farming & Productivity Enhancement",
    description:
      "Promoting modern practices such as precision farming, zero-wastage models, and advanced crop management to maximize farm productivity.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    ),
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Agri-Engineering & Farm Services",
    description:
      "Providing access to farm mechanization, agri-engineering solutions, and custom services that reduce drudgery, save time, and improve efficiency.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    gradient: "from-green-600 to-emerald-700",
  },
];

const OverviewCards = ({ addRef }) => {
  const cardsRef = useRef([]);

  return (
    <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
      {overviewData.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            cardsRef.current[index] = el;
            if (addRef) addRef(el);
          }}
          className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
        >
          {/* Top gradient accent bar */}
          <div className={`h-1.5 w-full bg-gradient-to-r ${item.gradient}`}></div>

          {/* Card content */}
          <div className="p-4 sm:p-6">
            {/* Icon container */}
            <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-8 sm:[&>svg]:h-8`}>
              {item.icon}
            </div>

            {/* Title */}
            <h4 className="text-sm sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-green-700 transition-colors duration-300 leading-tight">
              {item.title}
            </h4>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed hidden sm:block">
              {item.description}
            </p>
          </div>

          {/* Background pattern (subtle) */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-green-600">
              <circle cx="80" cy="20" r="40" fill="currentColor"/>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
