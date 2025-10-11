import React from "react";

const coreValues = [
  {
    title: "Farmer First",
    description: "Every decision is made with the farmer’s interest at heart",
  },
  {
    title: "Quality Assurance",
    description: "Pure, safe, and natural products",
  },
  {
    title: "Sustainability",
    description: "Eco-friendly practices, zero-waste processing, and a focus on natural farming",
  },
  {
    title: "Community Empowerment",
    description: "Creating local jobs and preserving agri-heritage",
  },
  {
    title: "Consumer Trust",
    description: "Transparent sourcing, honest labeling",
  },
];

export default function CoreValues() {
  return (
    <section className="mt-16 ml-3 mr-3">
      <div className="flex items-center gap-3 mb-6">
        <span className="h-[6px] w-12 bg-green-700"></span>
        <h3 className="text-xl sm:text-2xl font-bold uppercase text-green-700 tracking-wide">
          Core Values
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coreValues.map((value, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300"
          >
            <h4 className="text-lg font-bold text-gray-800">{value.title}</h4>
            <p className="mt-2 text-sm text-gray-600">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
