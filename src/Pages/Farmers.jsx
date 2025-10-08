import React, { useEffect, useRef, useState } from "react";
import { FARMERS } from "../data/farmersData";

// (Removed caching & geocoding – static heuristic coordinates now.)

// Rate limiting utility
class RateLimiter {
  constructor(maxRequests = 5, timeWindow = 1000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
  }

  async throttle() {
    const now = Date.now();
    this.requests = this.requests.filter(
      (time) => now - time < this.timeWindow
    );

    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = Math.min(...this.requests);
      const delay = this.timeWindow - (now - oldestRequest) + 50;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return this.throttle();
    }

    this.requests.push(now);
  }
}

export default function Farmers() {
  const mapRef = useRef(null);
  const [error, setError] = useState("");
  const [farmerData] = useState(FARMERS);
  const [farmersWithCoords, setFarmersWithCoords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [viewportBounds, setViewportBounds] = useState(null);
  const [showViewportOnly, setShowViewportOnly] = useState(false);
  // (Progress state removed – all data static.)
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // used only for static map fallback (optional)

  // Filter farmers based on search term and viewport
  const getFilteredFarmers = () => {
    // Use farmers with coordinates for filtering
    const dataToFilter =
      farmersWithCoords.length > 0 ? farmersWithCoords : farmerData;

    let filtered = dataToFilter.filter(
      (farmer) =>
        farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // If viewport filtering is enabled and we have bounds, filter by visible area
    if (
      showViewportOnly &&
      viewportBounds &&
      window.google &&
      window.google.maps
    ) {
      filtered = filtered.filter((farmer) => {
        if (!farmer.lat || !farmer.lng) return false;
        try {
          const farmerLatLng = new window.google.maps.LatLng(
            farmer.lat,
            farmer.lng
          );
          return viewportBounds.contains(farmerLatLng);
        } catch (error) {
          console.warn("Error checking bounds for farmer:", farmer.name, error);
          return false;
        }
      });
    }

    return filtered;
  };

  const filteredFarmers = getFilteredFarmers();

  // Re-render when viewport bounds change to update the filtered list
  useEffect(() => {
    // This effect will trigger a re-render when viewportBounds changes
    // The getFilteredFarmers function will be called again with new bounds
  }, [viewportBounds, showViewportOnly, farmersWithCoords, searchTerm]);

  useEffect(() => {
    let mapInstance = null;
    let markers = [];
    let clustererInstance = null;

    // Function to center map on selected farmer
    window.centerOnFarmer = (farmerName) => {
      const marker = markers.find((m) => m.farmerData?.name === farmerName);
      if (marker && mapInstance) {
        mapInstance.setCenter(marker.getPosition());
        mapInstance.setZoom(15);
        // Trigger click to show info window
        window.google.maps.event.trigger(marker, "click");
      }
    };

    // Function to update viewport bounds
    function updateViewportBounds() {
      if (mapInstance && window.google && window.google.maps) {
        try {
          const bounds = mapInstance.getBounds();
          if (bounds) {
            setViewportBounds(bounds);
          }
        } catch (error) {
          console.warn("Error updating viewport bounds:", error);
        }
      }
    }

    async function initMap() {
      try {
        if (!window.google || !window.google.maps) {
          setError(
            "Google Maps SDK not loaded. Ensure script tag is present in index.html."
          );
          return;
        }

        mapInstance = new window.google.maps.Map(mapRef.current, {
          center: { lat: 11.1271, lng: 78.6569 },
          zoom: 7,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        });

        mapInstance.addListener("bounds_changed", () => {
          clearTimeout(window.boundsUpdateTimeout);
          window.boundsUpdateTimeout = setTimeout(updateViewportBounds, 250);
        });

        mapInstance.addListener("zoom_changed", () => {
          const zoom = mapInstance.getZoom();
          if (zoom >= 12) setShowViewportOnly(true);
          else if (zoom < 10) setShowViewportOnly(false);
          updateViewportBounds();
        });

        buildOrReuseMarkers(mapInstance);
      } catch (err) {
        console.error("Map init error", err);
        setError("Failed to initialize map");
      }
    }

    // Function to load CSV data and geocode addresses (optimized)
    function buildOrReuseMarkers(map) {
      const bounds = new window.google.maps.LatLngBounds();
      // Reuse global markers if already built
      if (!window._farmerMarkers) {
        window._farmerMarkers = FARMERS.filter((f) => f.lat && f.lng).map(
          (f) => {
            const marker = new window.google.maps.Marker({
              position: { lat: f.lat, lng: f.lng },
              title: f.name,
            });
            const infoWindow = new window.google.maps.InfoWindow({
              content: `<div style="max-width:300px;">
              <h3 style="margin:0 0 8px;font-weight:600;">${f.name}</h3>
              <p style="margin:0;font-size:14px;color:#666;">${f.address}</p>
              ${
                f.approximate
                  ? '<p style="margin:4px 0 0;font-size:11px;color:#999;">Approximate</p>'
                  : ""
              }
            </div>`,
            });
            marker.addListener("click", () => infoWindow.open(map, marker));
            marker.farmerData = f;
            return marker;
          }
        );
      }

      const markers = window._farmerMarkers;
      markers.forEach((m) => bounds.extend(m.getPosition()));
      setFarmersWithCoords(FARMERS);
      updateCluster(map, markers, bounds);
      setTimeout(() => updateViewportBounds(), 250);
    }

    // Parse CSV text into array of objects
    // CSV parsing removed (data now imported statically)

    // Optimized geocoding function
    // Geocoding removed (no per-farmer API calls now)

    // Helper function to update map markers
    function updateCluster(map, markers, bounds) {
      if (!window.markerClusterer || !window.markerClusterer.MarkerClusterer)
        return;
      const { MarkerClusterer } = window.markerClusterer;
      // reuse global clusterer if exists
      if (window._farmerClusterer) {
        window._farmerClusterer.clearMarkers();
        window._farmerClusterer.addMarkers(markers);
        window._farmerClusterer.setMap(map);
      } else {
        window._farmerClusterer = new MarkerClusterer({ map, markers });
      }
      if (markers.length > 0 && !bounds.isEmpty()) map.fitBounds(bounds);
    }

    initMap();

    return () => {
      // Cleanup clusterer and markers
      if (clustererInstance) {
        clustererInstance.clearMarkers();
      }
      markers.forEach((marker) => marker.setMap(null));
      if (mapInstance) {
        mapInstance = null;
      }
    };
  }, [apiKey]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Farmers Directory
        </h1>
        <p className="text-slate-600 mt-1">
          {error
            ? error
            : `${farmerData.length} farmers loaded instantly (approximate map positions).`}
        </p>
        {!error && (
          <div className="mt-2 flex gap-4 text-sm text-slate-500">
            <span>🚀 Static data (no geocode API calls)</span>
          </div>
        )}
      </div>

      {/* Split Layout Container */}
      <div className="flex gap-6 h-[75vh]">
        {/* Left Half - Search and Farmer Cards */}
        <div className="w-1/2 flex flex-col">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search farmers by name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-slate-500">
                {filteredFarmers.length} of{" "}
                {farmersWithCoords.length > 0
                  ? farmersWithCoords.length
                  : farmerData.length}{" "}
                farmers
                {showViewportOnly &&
                  viewportBounds &&
                  " (visible in current view)"}
              </p>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showViewportOnly}
                  onChange={(e) => setShowViewportOnly(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span
                  className={`${
                    showViewportOnly
                      ? "text-blue-600 font-medium"
                      : "text-slate-600"
                  }`}
                >
                  Show visible only {showViewportOnly && "✓"}
                </span>
              </label>
            </div>
          </div>

          {/* Farmer Cards Container */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {filteredFarmers.length > 0 ? (
              filteredFarmers.map((farmer, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
                    selectedFarmer?.name === farmer.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                  onClick={() => {
                    setSelectedFarmer(farmer);
                    // Center map on this farmer
                    if (window.centerOnFarmer) {
                      window.centerOnFarmer(farmer.name);
                    }
                  }}
                >
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {farmer.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {farmer.address}
                  </p>
                  <div className="mt-2 flex items-center text-xs text-slate-500">
                    <svg
                      className="h-3 w-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Click to view on map {farmer.approximate && "(approx)"}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <svg
                  className="h-12 w-12 mx-auto mb-4 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p>No farmers found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Half - Map */}
        <div className="w-1/2">
          <div
            ref={mapRef}
            className="w-full h-full rounded-xl border border-slate-200 shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}
