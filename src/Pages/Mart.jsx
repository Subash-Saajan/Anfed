import React from "react";
import { Link } from "react-router-dom";

const martFeatures = [
  {
    title: "Fresh Farm Produce",
    description: "Daily procurement of fresh vegetables, fruits, and grains directly from local farmers.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z"/>
        <path d="M12 22V12"/>
        <path d="M8 12c0-3 2-5.5 4-7"/>
      </svg>
    ),
  },
  {
    title: "Pesticide-Free Section",
    description: "Dedicated area for certified organic and naturally grown products.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: "Value-Added Products",
    description: "Pickles, herbal powders, cold-pressed oils, and traditional preparations.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: "Fair Trade Practices",
    description: "Direct farmer-to-consumer model ensuring fair prices for both parties.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

const outlets = [
  { name: "ANFED Mart - Main Branch", location: "Anuman Nathi Village Center", timing: "7:00 AM - 8:00 PM" },
  { name: "ANFED Mart - Block Office", location: "Near Block Development Office", timing: "8:00 AM - 7:00 PM" },
  { name: "ANFED Mart - Weekly Market", location: "Village Haat (Every Sunday)", timing: "6:00 AM - 12:00 PM" },
];

export default function Mart() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            Direct Market Linkages
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
          ANFED MART
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-6">
          Connecting farmers directly to consumers with fresh, natural, and pesticide-free produce.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all">
            Visit Our Outlets
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link to="/farmers" className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-full hover:bg-gray-200 transition-all">
            Become a Supplier
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">What We Offer</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ANFED Mart brings you the best of natural farming - fresh, healthy, and sustainably grown products.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {martFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Outlets Section */}
      <div className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="h-10 w-1.5 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></span>
              <span className="h-7 w-1 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></span>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Our Outlets</h2>
              <p className="text-sm text-gray-500">Find us near you</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {outlets.map((outlet, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{outlet.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{outlet.location}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                      {outlet.timing}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Want to sell your produce?</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Join our network of farmers and get fair prices for your natural and organic produce.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all"
          >
            Contact Us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
