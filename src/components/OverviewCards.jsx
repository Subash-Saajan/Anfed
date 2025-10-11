// src/components/OverviewCards.jsx
import React, { useRef } from "react";

const overviewData = [
    {
      title: "Market Access & Value Addition",
      description:
        "Strengthening collective marketing, establishing direct farmer-to-consumer linkages, and enhancing income through value-added agri and herbal products.",
    },
    {
      title: "Promotion of Natural & Herbal Farming",
      description:
        "Encouraging chemical-free agriculture, promoting herbal cultivation and collection, and reviving traditional practices for long-term sustainability.",
    },
    {
      title: "Sustainable Livelihoods & Rural Enterprises",
      description:
        "Creating employment and entrepreneurship opportunities for farmers, women, and youth through decentralized agro-based units and rural enterprises.",
    },
    {
      title: "Eco-Restoration & Resource Management",
      description:
        "Linking river and tank restoration with improved farming systems, while ensuring traceability, transparency, and long-term ecological balance.",
    },
    {
      title: "Precision Farming & Productivity Enhancement",
      description:
        "Promoting modern practices such as precision farming, zero-wastage models, and advanced crop management to maximize farm productivity.",
    },
    {
      title: "Agri-Engineering & Farm Services",
      description:
        "Providing access to farm mechanization, agri-engineering solutions, and custom services that reduce drudgery, save time, and improve efficiency.",
    },
  ];
  
const OverviewCards = ({ addRef }) => {
  const cardsRef = useRef([]);

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 justify-center justify-items-center">
      {overviewData.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            cardsRef.current[index] = el;
            if (addRef) addRef(el);
          }}
          className="relative rounded-xl bg-white p-10 shadow-xl border-2 border-green-100"
        >
          <div className="absolute -top-4 left-6 h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center">
            <div className="h-7 w-7 rounded-full border-4 border-green-700 flex items-center justify-center">
              <span className="h-2.5 w-2.5 rounded-full bg-green-700 block"></span>
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-xl sm:text-base font-bold text-gray-800">{item.title}</h4>
            <p className="mt-2 text-[11px] font-bold sm:text-[12px] text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
