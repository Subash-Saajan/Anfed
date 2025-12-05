import React from "react";

const coreValues = [
  {
    title: "Farmer First",
    description: "Every decision is made with the farmer's interest at heart",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    color: "emerald",
  },
  {
    title: "Quality Assurance",
    description: "Pure, safe, and natural products",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    color: "green",
  },
  {
    title: "Sustainability",
    description: "Eco-friendly practices, zero-waste processing, and a focus on natural farming",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z"/>
        <path d="M12 22V12"/>
        <path d="M8 12c0-3 2-5.5 4-7"/>
        <path d="M16 12c0-3-2-5.5-4-7"/>
      </svg>
    ),
    color: "teal",
  },
  {
    title: "Community Empowerment",
    description: "Creating local jobs and preserving agri-heritage",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: "lime",
  },
  {
    title: "Consumer Trust",
    description: "Transparent sourcing, honest labeling",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
      </svg>
    ),
    color: "amber",
  },
];

const colorVariants = {
  emerald: {
    bg: "bg-emerald-50",
    iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    border: "border-emerald-200",
    accent: "bg-emerald-500",
  },
  green: {
    bg: "bg-green-50",
    iconBg: "bg-gradient-to-br from-green-400 to-green-600",
    border: "border-green-200",
    accent: "bg-green-500",
  },
  teal: {
    bg: "bg-teal-50",
    iconBg: "bg-gradient-to-br from-teal-400 to-teal-600",
    border: "border-teal-200",
    accent: "bg-teal-500",
  },
  lime: {
    bg: "bg-lime-50",
    iconBg: "bg-gradient-to-br from-lime-400 to-lime-600",
    border: "border-lime-200",
    accent: "bg-lime-500",
  },
  amber: {
    bg: "bg-amber-50",
    iconBg: "bg-gradient-to-br from-amber-400 to-amber-600",
    border: "border-amber-200",
    accent: "bg-amber-500",
  },
};

export default function CoreValues() {
  return (
    <section className="mt-16 ml-3 mr-3">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <span className="h-8 w-1.5 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></span>
          <span className="h-6 w-1 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></span>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Core Values
          </h3>
          <p className="text-sm text-gray-500 mt-1">What drives us forward</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {coreValues.map((value, index) => {
          const colors = colorVariants[value.color];
          return (
            <div
              key={index}
              className={`group relative p-5 rounded-2xl ${colors.bg} border ${colors.border} hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {value.icon}
              </div>

              {/* Content */}
              <h4 className="text-base font-bold text-gray-800 mb-2">
                {value.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {value.description}
              </p>

              {/* Decorative corner accent */}
              <div className={`absolute bottom-0 right-0 w-16 h-16 ${colors.accent} opacity-5 rounded-tl-full`}></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
