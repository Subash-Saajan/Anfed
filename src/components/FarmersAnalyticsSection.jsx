import {
  FarmerBarChart,
  FarmerLineChart,
  FarmerPieChart, StatisticsCards
} from "./FarmerCharts";
import CropPieCarousel from "./CropPieCarousel";
import { CROP_COLUMNS } from "../constants/crops";
import { DataFilters } from "./DataFilters";
import { COLORS } from "./FarmerCharts";
import { FaBullseye } from "react-icons/fa6";


export default function FarmersAnalyticsSection({
  dataFilters,
  setDataFilters,
  filterOptions,
  filteredCropPieData,
  excelData,
  farmersByHamlet,
  farmersByVillage
}) {
  const cropList = ["ALL", ...CROP_COLUMNS];
  return (
    <div>
<div className="grid grid-cols-12 gap-6">

{/* LEFT COLUMN */}
<div className="col-span-3 space-y-6">

  {/* BUBBLES FIRST */}
  <div className="bg-white p-4 rounded-xl shadow">
    <h4 className="font-semibold mb-3">Crops</h4>
    <div className="flex flex-wrap gap-2">
      {cropList.map(crop => (
        <button
          key={crop}
          onClick={() => setDataFilters({ ...dataFilters, crop })}
          className={`px-3 py-1 rounded-full border text-sm transition
            ${dataFilters.crop === crop
              ? "bg-green-600 text-white border-green-600"
              : "bg-white border-slate-300 hover:bg-slate-100"}`}
        >
          {crop}
        </button>
      ))}
    </div>
  </div>

  {/* FILTERS BELOW */}
  {/* <div className="bg-white p-4 rounded-xl shadow"> */}
  <div>
    <DataFilters
      filters={dataFilters}
      onFilterChange={setDataFilters}
      options={{
        villages: filterOptions.villages,
        hamlets: filterOptions.hamlets
      }}
      hideProduct
    />
  </div>

</div>

{/* CENTER COLUMN */}
<div className="col-span-6 space-y-6">

  {/* BIG PIE */}
  <div className="bg-white p-4 rounded-xl shadow">
    <FarmerPieChart
      title={
        dataFilters.crop && dataFilters.crop !== "ALL"
          ? `${dataFilters.crop} Count`
          : "Crop Distribution"
      }
      
      data={filteredCropPieData}
      
      showPercent={true}
      showValue={true}
    />
  </div>

  {/* LEGEND */}
  <div className="bg-white p-4 rounded-xl shadow">
    <div className="grid grid-cols-2 gap-2 text-sm">
      {filteredCropPieData.map((item, idx) => (
        <div key={item.name} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: COLORS[idx % COLORS.length] }}
          />
          {item.name}
        </div>
      ))}
    </div>
  </div>

</div>

{/* RIGHT COLUMN — STATS FIXED */}
<div className="col-span-3 sticky top-6 h-fit">
  <StatisticsCards
    data={excelData}
    cropCount={CROP_COLUMNS.length}
  />
</div>

</div>
<div className="grid grid-cols-2 gap-6 mt-8">

  <div className="bg-white p-4 rounded-xl shadow">
    <FarmerLineChart
      title="Farmers by Hamlet"
      data={farmersByHamlet}
    />
  </div>

  <div className="bg-white p-4 rounded-xl shadow">
    <FarmerBarChart
      title="Farmers by Village"
      data={farmersByVillage}
    />
  </div>

</div>
</div>

//     <div className="space-y-10">
      
// <StatisticsCards data={excelData} cropCount={CROP_COLUMNS.length}/>
//       {/* 1️⃣ Hamlet vs Farmers (LINE) */}
//       <FarmerLineChart
//         title="Farmers by Hamlet"
//         data={farmersByHamlet}
//       />

//       {/* 2️⃣ Farmers by Village (BAR) */}
//       <FarmerBarChart
//         title="Farmers by Village"
//         data={farmersByVillage}
//       />

//       {/* 3️⃣ Crop-wise Pie Charts */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
//       <div className="w-full max-w-none px-6">
//         {/* {cropPieData.map(({ crop, data }) => (
//           <FarmerPieChart
//             key={crop}
//             title={`${crop} Distribution by Hamlet`}
//             data={data}
//           />
//         ))} */}
//         <CropPieCarousel cropPieData={cropPieData} />

//       </div>

//     </div>
  );
}

// import { FarmerBarChart } from "./FarmerCharts";

// export default function FarmersAnalyticsSection({
//   cropWisePlotData,
//   hamletsPerVillage,
// }) {
//   return (
//     <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">

//       {/* Hamlet count per village */}
//       <FarmerBarChart
//         title="Number of Hamlets per Village"
//         data={hamletsPerVillage}
//       />

//       {/* One plot per crop */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         {cropWisePlotData.map(({ crop, data }) => (
//           <FarmerBarChart
//             key={crop}
//             title={`${crop} Distribution`}
//             data={data}
//           />
//         ))}
//       </div>

//     </div>
//   );
// }
