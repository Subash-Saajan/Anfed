import React from "react";

const initiatives = [
  {
    title: "ANFED MART (Direct Market Linkages)",
    description: "Daily farm procurement, distribution network, pesticide-free section.",
  },
  {
    title: "Training & Capacity Building",
    description: "Natural farming, post-harvest handling, outlet management.",
  },
  {
    title: "Outreach Programs",
    description: "Farmer field days, awareness camps, village-level events.",
  },
  {
    title: "Value Addition & Enterprises",
    description: "Pickles, Herbal powders, oils, processing ventures.",
  },
];

export default function Initiatives() {
  return (
    <section className="mt-16 ml-3 mr-3">
      <div className="flex items-center gap-3 mb-6">
        <span className="h-[6px] w-12 bg-green-700"></span>
        <h3 className="text-xl sm:text-2xl font-bold uppercase text-green-700 tracking-wide">
          Our Initiatives
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initiatives.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300"
          >
            <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
