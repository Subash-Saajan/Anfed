import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FARMERS } from "../data/farmersData";
import {
  parseFarmerExcelData,
  getUniqueValues,
  filterData,
  aggregateData,
} from "../utils/excelParser";
import {
  FarmerBarChart,
  FarmerPieChart,
  FarmerLineChart,
  StatisticsCards,
} from "../components/FarmerCharts";
import { DataFilters } from "../components/DataFilters";
// Always-on viewport filtering version.
import FarmersAnalyticsSection from "../components/FarmersAnalyticsSection";
import { Crop } from "lucide-react";
import { COLORS } from "../components/FarmerCharts";
import { CROP_COLUMNS } from "../constants/crops";
import CropPieCarousel from "../components/CropPieCarousel";

export default function Farmers() {
  const mapRef = useRef(null);
  const listRef = useRef(null); // scroll container for farmer cards
  // (Removed error state – assuming scripts preload correctly.)
  const [farmerData] = useState(FARMERS);
  const [farmersWithCoords, setFarmersWithCoords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [viewportBounds, setViewportBounds] = useState(null);
  // Viewport filtering default ON; user can toggle off
  const [showViewportOnly, setShowViewportOnly] = useState(true);
  // (Progress state removed – all data static.)
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // used only for static map fallback (optional)

  // Excel data and filters (rendered above map area)
  const [excelData, setExcelData] = useState([]);
  const [dataFilters, setDataFilters] = useState({
    village: "",
    hamlet: "",
    crop: "",
  });
  const [filterOptions, setFilterOptions] = useState({
    villages: [],
    hamlets: [],
    crops: [],
  });

  const cropList = ["ALL", ...CROP_COLUMNS];

  useEffect(() => {
    async function loadExcel() {
      try {
        const data = await parseFarmerExcelData("/farmer_website_detail.xlsx");
        setExcelData(data || []);
        setFilterOptions({
          villages: [...new Set(data.map((d) => d["Village Name"]))],
          hamlets: [...new Set(data.map((d) => d["Hamlet Name"]))],
          crops: cropList,
        });

        // setFilterOptions({
        //   villages: getUniqueValues(data, "village"),
        //   hamlets: getUniqueValues(data, "hamlet"),
        //   products: getUniqueValues(data, "product"),
        // });
      } catch (err) {
        console.error("Failed to load excel data", err);
      }
    }
    loadExcel();
  }, []);
  useEffect(() => {
    console.log("Excel data loaded:", excelData);
    console.log("First row:", excelData[0]);
  }, [excelData]);

  const farmersByHamlet = Object.values(
    excelData.reduce((acc, row) => {
      const hamlet = row["Hamlet Name"];
      const farmers = Number(row["Total Number of farmer"] || 0);

      if (!acc[hamlet]) {
        acc[hamlet] = { name: hamlet, value: 0 };
      }

      acc[hamlet].value += farmers;
      return acc;
    }, {})
  );

  const farmersByVillage = Object.values(
    excelData.reduce((acc, row) => {
      const village = row["Village Name"];
      const farmers = Number(row["Total Number of farmer"] || 0);

      if (!acc[village]) {
        acc[village] = { name: village, value: 0 };
      }

      acc[village].value += farmers;
      return acc;
    }, {})
  );

  const cropPieData = cropList.map((crop) => {
    const byHamlet = Object.values(
      excelData.reduce((acc, row) => {
        const hamlet = row["Hamlet Name"];
        const value = Number(row[crop] || 0);

        if (value > 0) {
          if (!acc[hamlet]) {
            acc[hamlet] = { name: hamlet, value: 0 };
          }
          acc[hamlet].value += value;
        }
        return acc;
      }, {})
    );

    return {
      crop,
      data: byHamlet,
    };
  });

  console.log("Farmers by Hamlet:", farmersByHamlet);
  console.log("Farmers by Village:", farmersByVillage);
  console.log("Crop Pie Example:", cropPieData[0]);

  // =======================
  // ANALYTICS DATA
  // =======================

  // // Crop-wise plots (one plot per crop)
  // const cropWisePlotData = CROP_COLUMNS.map((crop) => ({
  //   crop,
  //   data: excelData.map((row) => ({
  //     name: row["Village Name"],
  //     value: Number(row[crop] || 0),
  //   })),
  // }));

  // // Number of hamlets per village
  // const hamletsPerVillage = Object.values(
  //   excelData.reduce((acc, row) => {
  //     const village = row["Village Name"];
  //     const hamlet = row["Hamlet Name"];

  //     if (!acc[village]) {
  //       acc[village] = {
  //         village,
  //         hamlets: new Set(),
  //       };
  //     }

  //     acc[village].hamlets.add(hamlet);
  //     return acc;
  //   }, {})
  // ).map((v) => ({
  //   name: v.village,
  //   value: v.hamlets.size,
  // }));
  // console.log("Crop plots:", cropWisePlotData.length);
  // console.log("First crop data:", cropWisePlotData[0]);
  // console.log("Hamlet plot:", hamletsPerVillage);

  const filteredExcelData = filterData(excelData, dataFilters);
  console.log("Analytics data:", filteredExcelData);

  // Helper to create stable slug for DOM data attributes
  const slugify = useCallback(
    (str) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    []
  );

  const filteredRows = excelData.filter((row) => {
    if (dataFilters.hamlet && row["Hamlet Name"] !== dataFilters.hamlet)
      return false;
    if (dataFilters.village && row["Village Name"] !== dataFilters.village)
      return false;
    return true;
  });

  // const filteredRows = excelData.filter(row => {
  //   if (dataFilters.hamlet && row["Hamlet Name"] !== dataFilters.hamlet)
  //     return false;
  //   if (dataFilters.village && row["Village Name"] !== dataFilters.village)
  //     return false;
  //   return true;
  const filteredCropPieData =
    dataFilters.crop && dataFilters.crop !== "ALL"
      ? Object.values(
          filteredRows.reduce((acc, row) => {
            const key = row["Hamlet Name"]; // or Village Name if you prefer

            const value = Number(row[dataFilters.crop] || 0);

            if (value > 0) {
              if (!acc[key]) acc[key] = { name: key, value: 0 };
              acc[key].value += value;
            }

            return acc;
          }, {})
        )
      : CROP_COLUMNS.map((crop) => ({
          name: crop,
          value: filteredRows.reduce(
            (sum, row) => sum + Number(row[crop] || 0),
            0
          ),
        })).filter((i) => i.value > 0);

  // });
  //2nd
  // const filteredCropPieData = CROP_COLUMNS
  // .filter(crop => !dataFilters.crop || crop === dataFilters.crop)
  // .map(crop => ({
  //   name: crop,
  //   value: filteredRows.reduce(
  //     (sum, row) => sum + Number(row[crop] || 0),
  //     0
  //   )
  // }))
  // .filter(item => item.value > 0);

  // const filteredCropPieData = CROP_COLUMNS.map(crop => ({
  //   name: crop,
  //   value: filteredRows.reduce(
  //     (sum, row) => sum + Number(row[crop] || 0),
  //     0
  //   )
  // })).filter(item => item.value > 0);

  const scrollToFarmer = useCallback(
    (farmer) => {
      if (!farmer) return;
      const slug = slugify(farmer.name);
      const el = document.querySelector(`[data-farmer-id="${slug}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-2", "ring-blue-400");
        setTimeout(() => el.classList.remove("ring-2", "ring-blue-400"), 1200);
      }
    },
    [slugify]
  );

  // Scroll a card into view only if outside the visible portion of the list container
  const ensureVisible = useCallback(
    (farmerName, { flash = false } = {}) => {
      if (!farmerName || !listRef.current) return;
      const slug = slugify(farmerName);
      const container = listRef.current;
      const el = container.querySelector(`[data-farmer-id="${slug}"]`);
      if (!el) return;
      const cRect = container.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      const above = eRect.top < cRect.top + 20; // small padding
      const below = eRect.bottom > cRect.bottom - 20;
      if (above || below) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (flash) {
        el.classList.add("ring-2", "ring-blue-400");
        setTimeout(() => el.classList.remove("ring-2", "ring-blue-400"), 1000);
      }
    },
    [slugify]
  );

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

  // When selected farmer changes, always bring fully into view
  useEffect(() => {
    if (selectedFarmer) ensureVisible(selectedFarmer.name, { flash: true });
  }, [selectedFarmer, ensureVisible]);

  // (hover interactions removed — now use click to reveal details)

  useEffect(() => {
    let mapInstance = null;
    let markers = [];
    let clustererInstance = null;

    // Function to center map on selected farmer and show details above the marker
    window.centerOnFarmer = (farmerName) => {
      const allMarkers = window._farmerMarkers || [];
      const marker = allMarkers.find((m) => m.farmerData?.name === farmerName);
      if (marker && mapInstance) {
        mapInstance.setCenter(marker.getPosition());
        if (mapInstance.getZoom() < 15) mapInstance.setZoom(15);
        // Close any hover tooltips to avoid overlap
        allMarkers.forEach(
          (m) => m._hoverInfoWindow && m._hoverInfoWindow.close()
        );
        // Create the singleton detail InfoWindow if needed
        if (
          !window._farmerDetailInfoWindow &&
          window.google &&
          window.google.maps
        ) {
          window._farmerDetailInfoWindow = new window.google.maps.InfoWindow();
        }
        const detail = window._farmerDetailInfoWindow;
        if (detail) {
          const f = marker.farmerData || {};
          const content = `
            <div style="max-width:260px;padding:8px 10px;line-height:1.35">
              <div style="font-weight:600;color:#0f172a;margin-bottom:4px">${
                f.name || "Farmer"
              }</div>
              <div style="font-size:12px;color:#475569">${(f.address || "")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")}</div>
              ${
                f.approximate
                  ? '<div style="margin-top:6px;font-size:11px;color:#64748b">Location approx.</div>'
                  : ""
              }
            </div>`;
          detail.setContent(content);
          detail.open(mapInstance, marker);
        }
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
        if (!window.google || !window.google.maps) return; // silently fail

        mapInstance = new window.google.maps.Map(mapRef.current, {
          center: { lat: 11.1271, lng: 78.6569 },
          zoom: 7,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        });

        // Ensure a single detail InfoWindow exists for the session
        if (!window._farmerDetailInfoWindow) {
          window._farmerDetailInfoWindow = new window.google.maps.InfoWindow();
        }

        mapInstance.addListener("bounds_changed", () => {
          clearTimeout(window.boundsUpdateTimeout);
          window.boundsUpdateTimeout = setTimeout(updateViewportBounds, 250);
        });

        mapInstance.addListener("zoom_changed", () => {
          updateViewportBounds();
        });

        buildOrReuseMarkers(mapInstance);
      } catch (err) {
        console.error("Map init error", err);
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
            // On click: select farmer, center + open detail InfoWindow, and sync list
            marker.addListener("click", () => {
              setSelectedFarmer(f);
              if (window.centerOnFarmer) window.centerOnFarmer(f.name);
              scrollToFarmer(f);
            });
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
  }, [apiKey, scrollToFarmer]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12 farmers-page">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        {/* <Link
          to="/farmers-analytics"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Analytics
        </Link> */}
      </div>

      {/* <FarmersAnalyticsSection
  cropWisePlotData={cropWisePlotData}
  hamletsPerVillage={hamletsPerVillage}
/> */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Farmers Analytics Dashboard
        </h1>
        <p className="text-slate-600 mt-2">
          Visualize and analyze farmer data by village, hamlet, and product
        </p>
      </div>
      <FarmersAnalyticsSection
        dataFilters={dataFilters}
        setDataFilters={setDataFilters}
        filterOptions={filterOptions}
        filteredCropPieData={filteredCropPieData}
        excelData={excelData}
        farmersByHamlet={farmersByHamlet}
        farmersByVillage={farmersByVillage}
      />

      {/* 2️⃣ FILTERS — FULL WIDTH */}
      {/* <div className="my-6">
        <DataFilters
          filters={dataFilters}
          onFilterChange={setDataFilters}
          options={filterOptions}
        />
        <StatisticsCards data={filteredExcelData} cropCount={CROP_COLUMNS.length}/>

      </div> */}

      {/* {(dataFilters.hamlet || dataFilters.village || dataFilters.crop) && (
  <div className="flex gap-6 items-start">

    <div className="w-2/3">
      <FarmerPieChart
        title={
          dataFilters.crop
            ? `${dataFilters.crop} Count`
            : dataFilters.hamlet
            ? `Crop Distribution in ${dataFilters.hamlet}`
            : `Crop Distribution in ${dataFilters.village}`
        }
        data={filteredCropPieData}
        showPercent={false}
  showValue={true}
      />
    </div>

    <div className="w-1/3 text-sm">
      <h4 className="font-semibold mb-2">Legend</h4>
      <ul className="space-y-1">
        {filteredCropPieData.map((item, idx) => (
          <li key={item.name} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: COLORS[idx % COLORS.length] }}
            />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>

  </div>
)} */}

      {/* {(dataFilters.hamlet || dataFilters.village) ? (
  <FarmerPieChart
    title={
      dataFilters.hamlet
        ? `Crop Distribution in ${dataFilters.hamlet} Hamlet`
        : `Crop Distribution in ${dataFilters.village} Village`
    }
    data={filteredCropPieData}
  />
) : (
  <CropPieCarousel cropPieData={cropPieData} />
)} */}
      <br></br>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Farmers Directory
        </h1>
        <p className="text-slate-600 mt-1">
          Browse farmer locations and details on the map
        </p>
      </div>
      {/* 3️⃣ FARMERS DIRECTORY (LIST + MAP) */}
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
                {filteredFarmers.length}{" "}
                {showViewportOnly ? "visible in view" : "matching"} of{" "}
                {farmerData.length} farmers
              </p>

              <label className="flex items-center gap-2 text-xs select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={showViewportOnly}
                  onChange={(e) => setShowViewportOnly(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span
                  className={
                    showViewportOnly
                      ? "text-blue-600 font-medium"
                      : "text-slate-600"
                  }
                >
                  Viewport filter {showViewportOnly ? "ON" : "OFF"}
                </span>
              </label>
            </div>
          </div>

          {/* Farmer Cards */}
          <div ref={listRef} className="flex-1 overflow-y-auto space-y-3 pr-2">
            {filteredFarmers.length > 0 ? (
              filteredFarmers.map((farmer, index) => (
                <div
                  key={index}
                  data-farmer-id={slugify(farmer.name)}
                  className={`group rounded-xl border transition-all cursor-pointer 
                    p-3 md:p-4 bg-white hover:bg-slate-50 
                    ${
                      selectedFarmer?.name === farmer.name
                        ? "border-blue-500 ring-2 ring-blue-500/40 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                    }
                  `}
                  onClick={() => {
                    setSelectedFarmer(farmer);
                    if (window.centerOnFarmer) {
                      window.centerOnFarmer(farmer.name);
                    }
                    scrollToFarmer(farmer);
                  }}
                >
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {farmer.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {farmer.address}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <p>No farmers found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Half - MAP (aligned with list top) */}
        <div className="w-1/2">
          <div
            ref={mapRef}
            className="w-full h-full rounded-xl border border-slate-200 shadow-sm"
          />
        </div>
      </div>

      <style>{`
        .farmers-page .gm-ui-hover-effect {
          display: none !important;
        }
      `}</style>
    </section>
  );

  //   return (
  //     <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12 farmers-page">
  //       <div className="mb-6 flex items-center justify-between">
  //         {/* TOP ANALYTICS SECTION */}
  // <FarmersAnalyticsSection
  //   dataFilters={dataFilters}
  //   setDataFilters={setDataFilters}
  //   filterOptions={filterOptions}
  //   filteredExcelData={filteredExcelData}
  // />

  //         <div>
  //           <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
  //             Farmers Directory
  //           </h1>
  //           <p className="text-slate-600 mt-1">
  //             Browse farmer locations and details on the map
  //           </p>
  //         </div>
  //         <Link
  //           to="/farmers-analytics"
  //           className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
  //         >
  //           <svg
  //             className="w-5 h-5"
  //             fill="none"
  //             stroke="currentColor"
  //             viewBox="0 0 24 24"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  //             />
  //           </svg>
  //           Analytics
  //         </Link>
  //       </div>

  //       {/* Split Layout Container */}
  //       <div className="flex gap-6 h-[75vh]">
  //         {/* Left Half - Search and Farmer Cards */}
  //         <div className="w-1/2 flex flex-col">
  //           {/* Search Bar */}
  //           <div className="mb-4">
  //             <div className="relative">
  //               <input
  //                 type="text"
  //                 placeholder="Search farmers by name or address..."
  //                 value={searchTerm}
  //                 onChange={(e) => setSearchTerm(e.target.value)}
  //                 className="w-full px-4 py-2 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
  //               />
  //               <svg
  //                 className="absolute left-3 top-2.5 h-5 w-5 text-slate-400"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth={2}
  //                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  //                 />
  //               </svg>
  //             </div>
  //             <div className="flex justify-between items-center mt-1">
  //               <p className="text-sm text-slate-500">
  //                 {filteredFarmers.length}{" "}
  //                 {showViewportOnly ? "visible in view" : "matching"} of{" "}
  //                 {farmerData.length} farmers
  //               </p>
  //               <label className="flex items-center gap-2 text-xs select-none cursor-pointer">
  //                 <input
  //                   type="checkbox"
  //                   checked={showViewportOnly}
  //                   onChange={(e) => setShowViewportOnly(e.target.checked)}
  //                   className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
  //                 />
  //                 <span
  //                   className={
  //                     showViewportOnly
  //                       ? "text-blue-600 font-medium"
  //                       : "text-slate-600"
  //                   }
  //                 >
  //                   Viewport filter {showViewportOnly ? "ON" : "OFF"}
  //                 </span>
  //               </label>
  //             </div>
  //           </div>

  //           {/* Farmer Cards Container */}
  //           <div ref={listRef} className="flex-1 overflow-y-auto space-y-3 pr-2">
  //             {filteredFarmers.length > 0 ? (
  //               filteredFarmers.map((farmer, index) => (
  //                 <div
  //                   key={index}
  //                   data-farmer-id={slugify(farmer.name)}
  //                   className={`group rounded-xl border transition-all cursor-pointer
  //                     p-3 md:p-4 bg-white hover:bg-slate-50
  //                     ${
  //                       selectedFarmer?.name === farmer.name
  //                         ? "border-blue-500 ring-2 ring-blue-500/40 shadow-sm"
  //                         : hoveredFarmer === farmer.name
  //                         ? "border-blue-300 ring-1 ring-blue-300/60 shadow-sm"
  //                         : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
  //                     }
  //                   `}
  //                   onClick={() => {
  //                     setSelectedFarmer(farmer);
  //                     // Center map on this farmer and briefly show name tooltip on the marker
  //                     if (window.centerOnFarmer) {
  //                       window.centerOnFarmer(farmer.name);
  //                     }
  //                     scrollToFarmer(farmer);
  //                   }}
  //                   onMouseEnter={() => setHoveredFarmer(farmer.name)}
  //                   onMouseLeave={() =>
  //                     setHoveredFarmer((prev) =>
  //                       prev === farmer.name ? null : prev
  //                     )
  //                   }
  //                 >
  //                   <h3 className="font-semibold text-slate-900 mb-2">
  //                     {farmer.name}
  //                   </h3>
  //                   <p className="text-sm text-slate-600 leading-relaxed">
  //                     {farmer.address}
  //                   </p>
  //                   <div className="mt-2 flex items-center text-xs text-slate-500">
  //                     <svg
  //                       className="h-3 w-3 mr-1"
  //                       fill="none"
  //                       stroke="currentColor"
  //                       viewBox="0 0 24 24"
  //                     >
  //                       <path
  //                         strokeLinecap="round"
  //                         strokeLinejoin="round"
  //                         strokeWidth={2}
  //                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
  //                       />
  //                       <path
  //                         strokeLinecap="round"
  //                         strokeLinejoin="round"
  //                         strokeWidth={2}
  //                         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
  //                       />
  //                     </svg>
  //                     Click to view on map {farmer.approximate && "(approx)"}
  //                   </div>
  //                 </div>
  //               ))
  //             ) : (
  //               <div className="text-center py-8 text-slate-500">
  //                 <svg
  //                   className="h-12 w-12 mx-auto mb-4 text-slate-300"
  //                   fill="none"
  //                   stroke="currentColor"
  //                   viewBox="0 0 24 24"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     strokeWidth={2}
  //                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  //                   />
  //                 </svg>
  //                 <p>No farmers found matching your search.</p>
  //               </div>
  //             )}
  //           </div>
  //         </div>

  //         {/* Right Half - Analytics + Map */}
  //         <div className="w-1/2 flex flex-col gap-4">
  //           {/* Analytics area (filters, stats, charts) shown above the map */}
  //           {/* <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm max-h-[40%] overflow-y-auto">
  //             <DataFilters
  //               filters={dataFilters}
  //               onFilterChange={setDataFilters}
  //               options={filterOptions}
  //             />

  //             <StatisticsCards data={filteredExcelData} />

  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
  //               <div className="p-2 bg-white">
  //                 <FarmerBarChart
  //                   data={aggregateData(filteredExcelData, "village")}
  //                   title="Farmers by Village"
  //                 />
  //               </div>
  //               <div className="p-2 bg-white">
  //                 <FarmerPieChart
  //                   data={aggregateData(filteredExcelData, "product")}
  //                   title="Product Distribution"
  //                 />
  //               </div>
  //               <div className="p-2 bg-white md:col-span-2">
  //                 <FarmerLineChart
  //                   data={aggregateData(filteredExcelData, "hamlet")}
  //                   title="Farmers by Hamlet"
  //                 />
  //               </div>
  //             </div>
  //           </div> */}

  //           {/* Map area */}
  //           <div className="flex-1 min-h-0">
  //             <div
  //               ref={mapRef}
  //               className="w-full h-full rounded-xl border border-slate-200 shadow-sm"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       {/* Hide default Google Maps InfoWindow close X for a cleaner look */}
  //       <style>{`
  //         .farmers-page .gm-ui-hover-effect {
  //           display: none !important;
  //         }
  //       `}</style>
  //     </section>
  //   );
}
