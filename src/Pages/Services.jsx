import { useState } from "react";
import { Menu, X } from "lucide-react";

const services = [
  {
    id: "soil-testing",
    title: "Soil Testing",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600&auto=format&fit=crop&crop=center",
    desc: {
      intro: `Understanding your soil is the first step toward better farming. At Anuman Nathi FED Farmer Producer Company Ltd., we operate a dedicated Soil Testing Lab in collaboration with SATBLOOM to help farmers make informed cultivation decisions.`,
      details: `Before every crop cycle, our team collects soil samples from member farms, analyzes nutrient composition, and provides customized fertilizer and crop recommendations. This ensures improved yield, cost efficiency, and long-term soil health.`,
      list: [
        "Collect soil samples from farmers’ fields across the Anuman Nathi basin.",
        "Test key soil parameters including pH, nitrogen, phosphorus, potassium, and micronutrients.",
        "Provide digital and printed Soil Health Certificates with personalized recommendations.",
        "Guide farmers in selecting suitable crops and balanced fertilizer use for sustainable productivity.",
      ],
      closing: `Our soil testing service empowers farmers to optimize inputs, enhance productivity, and maintain ecological balance.`,
    },
  },

  {
    id: "anfed-mart",
    title:
      "ANFED Mart – Farmer-Led Value-Added Produce Mart",
   image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600&auto=format&fit=crop&crop=center",
    desc: {
      intro: `ANFED Mart is an upcoming initiative of Anuman Nathi FED Farmer Producer Company Ltd., designed to create a direct bridge between farmers and consumers. Rooted in our mission to enhance farmer income and promote sustainable agriculture, the mart will focus on fresh vegetables and locally made value-added products from the Anuman Nathi basin.`,
      details: `The mart will serve as a farmers’ collective outlet, offering seasonal vegetables, pickles, herbal powders, and other processed products prepared by our member farmers. It aims to ensure fair pricing, quality assurance, and market visibility for local produce.`,
      list: [
        "Direct farmer-to-consumer link for fresh produce.",
        "Focus on value-added local products.",
        "Ensures fair pricing and quality for all goods.",
        "Promotes sustainable and inclusive rural economy.",
      ],
      closing: `Through ANFED Mart, we envision a community-driven marketplace that supports both farm productivity and rural entrepreneurship.`,
    },
  },

  {
    id: "farm-pond",
    title: "Farm Pond Development",
image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600&auto=format&fit=crop&crop=center",
    desc: {
      intro: `To enhance water availability and promote sustainable agriculture, Anuman Nathi FED Farmer Producer Company Ltd. is implementing a Farm Pond Creation Project in Vilathikulam Block, supported by the HCL Foundation.`,
      details: `The project helps farmers store rainwater and runoff in scientifically designed farm ponds, enabling an additional cropping cycle even during dry months. Each pond is lined with durable tarpaulin sheets to minimize seepage and ensure year-round water retention.`,
      list: [
        "Scientific design for efficient rainwater harvesting.",
        "Tarpaulin lining to prevent seepage and ensure water retention.",
        "Supports year-round irrigation and additional cropping.",
        "Promotes resilience against drought conditions.",
      ],
      closing: `Through this initiative, farmers are empowered to improve crop productivity, reduce dependence on external water sources, and strengthen their resilience to drought.`,
    },
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const s = services[active];

  return (
    <div className="min-h-screen bg-white shadow-md overflow-hidden flex flex-col md:flex-row rounded-lg m-4 md:m-12">
      {/* Sidebar Toggle (Mobile Only) */}
      <div className="flex justify-between items-center p-4 border-b md:hidden">
        <h2 className="text-lg font-semibold">Our Services</h2>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700 p-2 rounded-md hover:bg-gray-100"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Left Sidebar */}
      <aside
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block md:w-1/3 p-6 border-r bg-white transition-all duration-300 overflow-y-auto`}
      >
        <p className="text-sm text-gray-500 mb-4">Our Service</p>
        <h2 className="text-2xl font-semibold mb-6">
          Expert Care for Your Farm
        </h2>
        <ul className="space-y-3">
          {services.map((svc, idx) => (
            <li key={svc.id}>
              <button
                onClick={() => {
                  setActive(idx);
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                  idx === active
                    ? "bg-gray-100 text-black font-medium shadow-sm"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {svc.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Right Content */}
      <section className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="rounded-lg overflow-hidden mb-6">
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-52 sm:h-64 md:h-80 object-cover"
          />
        </div>

        <h3 className="text-3xl font-bold mb-4">{s.title}</h3>

        {/* Structured description layout */}
        <div className="space-y-4 text-gray-700 leading-relaxed">
          {s.desc.intro && <p>{s.desc.intro}</p>}
          {s.desc.details && <p>{s.desc.details}</p>}

          {s.desc.list && (
            <ul className="list-disc pl-6 space-y-2">
              {s.desc.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {s.desc.closing && <p>{s.desc.closing}</p>}
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <button className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900">
            Details Services
          </button>
          <button className="px-4 py-2 border rounded-full hover:bg-gray-50">
            Book Appointment
          </button>
        </div>
      </section>
    </div>
  );
}
