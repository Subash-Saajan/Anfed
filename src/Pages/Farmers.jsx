import React, { useEffect, useRef, useState } from "react";

// Utility: load a script once
function loadScript(src, id) {
  return new Promise((resolve, reject) => {
    if (id && document.getElementById(id)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    if (id) s.id = id;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = (e) => reject(e);
    document.head.appendChild(s);
  });
}

// Geocoding cache utilities
const CACHE_KEY = "farmers_geocode_cache";
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

function getFromCache(address) {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
    const cached = cache[address];
    if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
      return cached.data;
    }
  } catch (e) {
    console.warn("Cache read error:", e);
  }
  return null;
}

function saveToCache(address, data) {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
    cache[address] = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn("Cache write error:", e);
  }
}

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
  const [loading, setLoading] = useState(true);
  const [farmerData, setFarmerData] = useState([]);
  const [farmersWithCoords, setFarmersWithCoords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [viewportBounds, setViewportBounds] = useState(null);
  const [showViewportOnly, setShowViewportOnly] = useState(false);
  const [geocodingProgress, setGeocodingProgress] = useState({
    current: 0,
    total: 0,
  });
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
        if (!apiKey) {
          setError(
            "Missing Google Maps API key. Set VITE_GOOGLE_MAPS_API_KEY in your .env file and restart the dev server."
          );
          setLoading(false);
          return;
        }

        // Load Google Maps JavaScript API
        await loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${apiKey}`,
          "google-maps"
        );

        // Load MarkerClusterer library
        await loadScript(
          "https://unpkg.com/@googlemaps/markerclusterer/dist/index.umd.js",
          "marker-clusterer"
        );

        // Create map centered on Tamil Nadu, India
        mapInstance = new window.google.maps.Map(mapRef.current, {
          center: { lat: 11.1271, lng: 78.6569 }, // Tamil Nadu center
          zoom: 7,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        });

        // Add map event listeners for viewport changes
        mapInstance.addListener("bounds_changed", () => {
          // Debounce the bounds update to avoid too frequent updates
          clearTimeout(window.boundsUpdateTimeout);
          window.boundsUpdateTimeout = setTimeout(updateViewportBounds, 500);
        });

        mapInstance.addListener("zoom_changed", () => {
          setTimeout(() => {
            const zoom = mapInstance.getZoom();
            // Auto-enable viewport filtering when zoomed in
            if (zoom >= 12) {
              setShowViewportOnly(true);
            } else if (zoom < 10) {
              setShowViewportOnly(false);
            }
            updateViewportBounds();
          }, 100);
        });

        // Load and process CSV data
        await loadFarmerData(mapInstance);

        setLoading(false);
      } catch (err) {
        console.error("Failed to initialize map:", err);
        setError(
          "Failed to load Google Maps. Please check your API key and internet connection."
        );
        setLoading(false);
      }
    }

    // Function to load CSV data and geocode addresses (optimized)
    async function loadFarmerData(map) {
      try {
        // Fetch CSV file
        const response = await fetch("/farmers/Farmer%20testing.csv");
        if (!response.ok) throw new Error("Failed to fetch CSV file");

        const csvText = await response.text();
        const farmers = parseCSV(csvText);

        // Initial set of farmer data (will be updated with coordinates as geocoding progresses)
        setFarmerData(farmers);
        setGeocodingProgress({ current: 0, total: farmers.length });

        const bounds = new window.google.maps.LatLngBounds();
        const rateLimiter = new RateLimiter(10, 1000); // 10 requests per second
        const BATCH_SIZE = 20; // Process in batches

        // Helper function to create marker
        function createMarker(farmer, location) {
          const marker = new window.google.maps.Marker({
            position: location,
            title: farmer.name,
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="max-width: 300px;">
                <h3 style="margin: 0 0 8px 0; font-weight: 600;">${farmer.name}</h3>
                <p style="margin: 0; font-size: 14px; color: #666;">${farmer.address}</p>
              </div>
            `,
          });

          const hoverInfoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 4px 8px;">
                <strong>${farmer.name}</strong>
              </div>
            `,
          });

          marker.addListener("click", () => {
            hoverInfoWindow.close();
            infoWindow.open(map, marker);
          });

          marker.addListener("mouseover", () => {
            hoverInfoWindow.open(map, marker);
          });

          marker.addListener("mouseout", () => {
            hoverInfoWindow.close();
          });

          marker.farmerData = {
            ...farmer,
            lat: location.lat,
            lng: location.lng,
          };
          markers.push(marker);
          bounds.extend(location);

          return marker;
        }

        // Process in batches for better performance
        for (
          let batchStart = 0;
          batchStart < farmers.length;
          batchStart += BATCH_SIZE
        ) {
          const batch = farmers.slice(
            batchStart,
            Math.min(batchStart + BATCH_SIZE, farmers.length)
          );

          // Process batch in parallel with rate limiting
          const batchPromises = batch.map(async (farmer, index) => {
            const globalIndex = batchStart + index;

            try {
              // Check cache first
              let location = getFromCache(farmer.address);

              if (!location) {
                await rateLimiter.throttle();
                location = await geocodeAddress(farmer.address);
                if (location) {
                  saveToCache(farmer.address, location);
                }
              }

              if (location) {
                // Update farmer data to include coordinates
                const farmerWithCoords = {
                  ...farmer,
                  lat: location.lat,
                  lng: location.lng,
                };
                // Update the original farmers array
                farmers[globalIndex] = farmerWithCoords;
                createMarker(farmerWithCoords, location);

                // Update the state with coordinates immediately for UI responsiveness
                setFarmersWithCoords((prev) => {
                  const updated = [...prev];
                  const existingIndex = updated.findIndex(
                    (f) =>
                      f.name === farmer.name && f.address === farmer.address
                  );
                  if (existingIndex >= 0) {
                    updated[existingIndex] = farmerWithCoords;
                  } else {
                    updated.push(farmerWithCoords);
                  }
                  return updated;
                });
              }

              // Update progress
              setGeocodingProgress({
                current: globalIndex + 1,
                total: farmers.length,
              });
            } catch (error) {
              console.warn(`Failed to geocode ${farmer.name}:`, error);
            }
          });

          // Wait for current batch to complete before starting next
          await Promise.all(batchPromises);

          // Update map every batch to show progressive loading
          if (markers.length > 0) {
            updateMapMarkers(map, bounds);
          }
        }

        // Final map update
        updateMapMarkers(map, bounds);

        // Final update of farmer data with all coordinates
        const farmersWithAllCoords = farmers.filter((f) => f.lat && f.lng);
        setFarmersWithCoords(farmersWithAllCoords);

        // Initial viewport bounds update
        setTimeout(() => {
          updateViewportBounds();
        }, 1000);

        setGeocodingProgress({
          current: farmers.length,
          total: farmers.length,
        });
      } catch (error) {
        console.error("Error loading farmer data:", error);
        setError("Failed to load farmer data from CSV file");
      }
    }

    // Parse CSV text into array of objects
    function parseCSV(csvText) {
      const lines = csvText.trim().split("\n");
      const farmers = [];

      // Skip header row and process data
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Simple CSV parsing - handle quoted fields
        const fields = [];
        let current = "";
        let inQuotes = false;

        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === "," && !inQuotes) {
            fields.push(current.trim());
            current = "";
          } else {
            current += char;
          }
        }
        fields.push(current.trim()); // Add last field

        if (fields.length >= 2) {
          farmers.push({
            name: fields[0].replace(/^"|"$/g, ""),
            address: fields[1].replace(/^"|"$/g, ""),
          });
        }
      }

      return farmers;
    }

    // Optimized geocoding function
    async function geocodeAddress(address) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}&region=IN&components=country:IN`;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          return { lat: location.lat, lng: location.lng };
        } else if (data.status === "OVER_QUERY_LIMIT") {
          // Exponential backoff for rate limits
          await new Promise((resolve) =>
            setTimeout(resolve, Math.random() * 2000 + 1000)
          );
          throw new Error("Rate limited - will retry");
        } else {
          return null;
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.warn(`Geocoding timeout for: ${address}`);
        } else {
          console.warn(`Geocoding error for ${address}:`, error.message);
        }
        return null;
      }
    }

    // Helper function to update map markers
    function updateMapMarkers(map, bounds) {
      // Remove existing clusterer
      if (clustererInstance) {
        clustererInstance.clearMarkers();
      }

      // Create new clusterer with current markers
      const { MarkerClusterer } = window.markerClusterer || {};
      if (MarkerClusterer && markers.length > 0) {
        clustererInstance = new MarkerClusterer({
          map,
          markers: [...markers], // Create a copy
          renderer: {
            render: ({ count, position, markers: clusterMarkers }) => {
              const farmerNames = clusterMarkers
                .map((marker) => marker.getTitle())
                .join(", ");

              const clusterMarker = new window.google.maps.Marker({
                position,
                icon: {
                  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="18" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2"/>
                      <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">${count}</text>
                    </svg>
                  `)}`,
                  scaledSize: new window.google.maps.Size(40, 40),
                  anchor: new window.google.maps.Point(20, 20),
                },
                zIndex: 1000,
                title: `${count} farmers: ${farmerNames}`,
              });

              const clusterInfoWindow = new window.google.maps.InfoWindow({
                content: `
                  <div style="max-width: 250px;">
                    <h4 style="margin: 0 0 8px 0; font-weight: 600;">${count} Farmers in this area:</h4>
                    <div style="font-size: 14px; color: #666; line-height: 1.4;">
                      ${clusterMarkers
                        .map((marker) => `• ${marker.getTitle()}`)
                        .join("<br>")}
                    </div>
                  </div>
                `,
              });

              clusterMarker.addListener("mouseover", () => {
                clusterInfoWindow.open(map, clusterMarker);
              });

              clusterMarker.addListener("mouseout", () => {
                clusterInfoWindow.close();
              });

              return clusterMarker;
            },
          },
        });
      }

      // Update bounds
      if (markers.length > 0 && !bounds.isEmpty()) {
        map.fitBounds(bounds);
      }
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
          {loading
            ? geocodingProgress.total > 0
              ? `Geocoding farmers... ${geocodingProgress.current}/${geocodingProgress.total}`
              : "Loading map..."
            : error
            ? error
            : `${farmerData.length} farmers registered. Search and explore locations.`}
        </p>
        {!loading && !error && (
          <div className="mt-2 flex gap-4 text-sm text-slate-500">
            <span>🚀 Optimized loading with caching</span>
            <button
              onClick={() => {
                localStorage.removeItem(CACHE_KEY);
                window.location.reload();
              }}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Clear cache & reload
            </button>
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
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-slate-600 mt-2">Loading farmers...</p>
              </div>
            ) : filteredFarmers.length > 0 ? (
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
                    Click to view on map
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
