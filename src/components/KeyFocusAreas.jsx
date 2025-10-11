import React from "react";

const focusAreas = [
  {
    title: "Market Access & Value Addition",
    description: "Strengthening collective marketing, establishing direct farmer-to-consumer linkages, and enhancing income through value-added agri and herbal products.",
  },
  {
    title: "Promotion of Natural & Herbal Farming",
    description: "Encouraging chemical-free agriculture, promoting herbal cultivation and collection, and reviving traditional practices for long-term sustainability.",
  },
  {
    title: "Sustainable Livelihoods & Rural Enterprises",
    description: "Creating employment and entrepreneurship opportunities for farmers, women, and youth through decentralized agro-based units and rural enterprises.",
  },
  {
    title: "Eco-Restoration & Resource Management",
    description: "Linking river and tank restoration with improved farming systems, while ensuring traceability, transparency, and long-term ecological balance.",
  },
  {
    title: "Precision Farming & Productivity Enhancement",
    description: "Promoting modern practices such as precision farming, zero-wastage models, and advanced crop management to maximize farm productivity.",
  },
  {
    title: "Agri-Engineering & Farm Services",
    description: "Providing access to farm mechanization, agri-engineering solutions, and custom services that reduce drudgery, save time, and improve efficiency.",
  },
  {
    title: "Capacity Building & End-to-End Support",
    description: "Training and handholding farmers from seed selection to crop management, harvest, value addition, and marketing—ensuring complete value chain support.",
  },
];

export default function KeyFocusAreas() {
  return (
    <section className="mt-16 ml-3 mr-3">
      <div className="flex items-center gap-3 mb-6">
        <span className="h-[6px] w-12 bg-green-700"></span>
        <h3 className="text-xl sm:text-2xl font-bold uppercase text-green-700 tracking-wide">
          Key Focus Areas
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {focusAreas.map((area, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300"
          >
            <h4 className="text-lg font-bold text-gray-800">{area.title}</h4>
            <p className="mt-2 text-sm text-gray-600">{area.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
