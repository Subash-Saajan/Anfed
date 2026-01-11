import {
  FarmerBarChart,
  FarmerLineChart,
  FarmerPieChart, StatisticsCards
} from "./FarmerCharts";
import CropPieCarousel from "./CropPieCarousel";
import { CROP_COLUMNS } from "../constants/crops";

export default function FarmersAnalyticsSection({
  excelData,
  farmersByHamlet,
  farmersByVillage,
  cropPieData,
}) {
  return (
    <div className="space-y-10">
<StatisticsCards data={excelData} cropCount={CROP_COLUMNS.length}/>
      {/* 1️⃣ Hamlet vs Farmers (LINE) */}
      <FarmerLineChart
        title="Farmers by Hamlet"
        data={farmersByHamlet}
      />

      {/* 2️⃣ Farmers by Village (BAR) */}
      <FarmerBarChart
        title="Farmers by Village"
        data={farmersByVillage}
      />

      {/* 3️⃣ Crop-wise Pie Charts */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
      <div className="w-full max-w-none px-6">
        {/* {cropPieData.map(({ crop, data }) => (
          <FarmerPieChart
            key={crop}
            title={`${crop} Distribution by Hamlet`}
            data={data}
          />
        ))} */}
        <CropPieCarousel cropPieData={cropPieData} />

      </div>

    </div>
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
