import React, { useState } from "react";

const galleryData = [
  {
    category: "River Revival",
    description: "Restoration of waterbodies in the Anuman Nathi basin",
    images: [
      { src: "/gallery/river1.jpg", title: "Anuman River - Before Restoration", description: "The dried up riverbed before our intervention" },
      { src: "/gallery/river2.jpg", title: "Anuman River - During Work", description: "Community participation in desilting work" },
      { src: "/gallery/river3.jpg", title: "Anuman River - After Revival", description: "The river flowing again after restoration" },
      { src: "/gallery/river4.jpg", title: "Tank Restoration", description: "Village tank rejuvenation project" },
    ],
  },
  {
    category: "Natural Farming",
    description: "Farmers practicing chemical-free agriculture",
    images: [
      { src: "/gallery/farm1.jpg", title: "Organic Paddy Field", description: "Lush green paddy fields without pesticides" },
      { src: "/gallery/farm2.jpg", title: "Herbal Garden", description: "Traditional medicinal plants cultivation" },
      { src: "/gallery/farm3.jpg", title: "Farmer Training", description: "Capacity building workshop on natural farming" },
      { src: "/gallery/farm4.jpg", title: "Harvest Festival", description: "Celebrating the first organic harvest" },
    ],
  },
  {
    category: "Community Events",
    description: "Bringing farmers and community together",
    images: [
      { src: "/gallery/event1.jpg", title: "Farmer Field Day", description: "Knowledge sharing among farmers" },
      { src: "/gallery/event2.jpg", title: "ANFED Mart Opening", description: "Inauguration of our first outlet" },
      { src: "/gallery/event3.jpg", title: "Awareness Camp", description: "Educating villagers about natural farming" },
      { src: "/gallery/event4.jpg", title: "Annual Meeting", description: "FPO members' general body meeting" },
    ],
  },
];

const videoData = [
  {
    title: "The Revival of Anuman River",
    description: "A documentary on how community effort brought back the river",
    thumbnail: "/gallery/video-thumb1.jpg",
    duration: "12:34",
  },
  {
    title: "From Soil to Soul",
    description: "The journey of natural farming in our region",
    thumbnail: "/gallery/video-thumb2.jpg",
    duration: "8:45",
  },
  {
    title: "Farmer Stories",
    description: "Testimonials from farmers who transformed their lives",
    thumbnail: "/gallery/video-thumb3.jpg",
    duration: "15:20",
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const allImages = galleryData.flatMap((cat) =>
    cat.images.map((img) => ({ ...img, category: cat.category }))
  );

  const filteredImages =
    activeCategory === "all"
      ? allImages
      : allImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
            Our Journey
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
          Gallery & Documentary
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
          Witness the transformation - from dried rivers to flowing streams, from chemical farming to natural abundance.
        </p>
      </div>

      {/* Videos Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="h-10 w-1.5 bg-gradient-to-b from-cyan-500 to-teal-600 rounded-full"></span>
            <span className="h-7 w-1 bg-gradient-to-b from-cyan-400 to-teal-500 rounded-full"></span>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Documentaries</h2>
            <p className="text-sm text-gray-500">Watch our story unfold</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videoData.map((video, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Thumbnail placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>
                <div className="relative z-10 w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-teal-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-800 mb-1 group-hover:text-teal-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="h-10 w-1.5 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full"></span>
              <span className="h-7 w-1 bg-gradient-to-b from-emerald-400 to-green-500 rounded-full"></span>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Photo Gallery</h2>
              <p className="text-sm text-gray-500">Moments captured along the way</p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {galleryData.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.category
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br from-gray-200 to-gray-300"
              >
                {/* Placeholder for actual images */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="M21 15l-5-5L5 21"/>
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white font-semibold text-sm">{image.title}</h4>
                    <p className="text-white/70 text-xs">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gray-800 rounded-2xl overflow-hidden">
              <div className="aspect-video bg-gray-700 flex items-center justify-center text-gray-500">
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
              </div>
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-400">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-black text-white mb-2">22+</div>
              <div className="text-white/80 text-sm">Waterbodies Revived</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black text-white mb-2">400+</div>
              <div className="text-white/80 text-sm">Farmers Empowered</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black text-white mb-2">15+</div>
              <div className="text-white/80 text-sm">Villages Covered</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black text-white mb-2">3+</div>
              <div className="text-white/80 text-sm">Years of Work</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
