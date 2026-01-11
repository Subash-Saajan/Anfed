import { useState } from "react";
import { FarmerPieChart } from "./FarmerCharts";
import { COLORS } from "./FarmerCharts";
export default function CropPieCarousel({ cropPieData }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = cropPieData.length;
  const currentCrop = cropPieData[currentIndex];

  const totalCount = currentCrop.data.reduce(
    (sum, item) => sum + item.value,
    0
  );
  
  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToCrop = (index) => {
    setCurrentIndex(index);
  };

  if (!total) return null;

  return (
    <div className="grid grid-cols-3 w-full items-start">


<div className="w-full justify-self-stretch flex flex-wrap gap-x-3 gap-y-2 px-6 pt-10">


  {cropPieData.map((item, index) => (
    <button
      key={item.crop}
      onClick={() => setCurrentIndex(index)}
      className={`px-4 py-1 rounded-full text-sm border transition
        ${
          index === currentIndex
            ? "bg-gradient-to-b from-green-500 to-emerald-600 text-white border-emerald-600 shadow-md"
            : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
        }`}
    >
      {item.crop}
    </button>
  ))}
</div>



{/* COLUMN 2: PIE + CONTROLS */}
<div className="col-span-1 w-full flex justify-center">
  <div className="w-full flex items-center justify-between px-4">
    <button
      onClick={goPrev}
      className="p-2 rounded border hover:bg-slate-100"
    >
      ←
    </button>

    <div className="flex flex-col items-center flex-1">
      <FarmerPieChart title="" data={currentCrop.data} showValue={false} showPercent={true}/>

      <p className="text-xs text-slate-600 mt-3 text-center">
  <span className="font-medium text-slate-800">
    Total: {totalCount}
  </span>
  <span className="mx-2 text-slate-400">|</span>
  {currentIndex + 1} / {cropPieData.length}
</p>

    </div>

    <button
      onClick={goNext}
      className="p-2 rounded border hover:bg-slate-100"
    >
      →
    </button>
  </div>
</div>




{/* COLUMN 3: LEGEND */}
<div className="w-full justify-self-stretch text-sm pl-6">
  <h4 className="font-semibold mb-3 text-center">Hamlets</h4>
  <ul
  className={`gap-x-6 gap-y-2 ${
    currentCrop.crop === "Coconut"
      ? "grid grid-cols-2"
      : "flex flex-col"
  }`}
>
  {currentCrop.data.map((item, idx) => (
    <li key={item.name} className="flex items-center gap-2">
      {/* <span
        className="inline-block w-3 h-3 rounded-sm shrink-0"
        style={{
          backgroundColor: `hsl(${idx * 45}, 70%, 55%)`,
        }}
      />
      <span className="truncate">{item.name}</span> */}
      <span
  className="inline-block w-3 h-3 rounded-sm shrink-0"
  style={{
    backgroundColor: COLORS[idx % COLORS.length],
  }}
/>
<span className="truncate">{item.name}</span>

    </li>
  ))}
</ul>

</div>



</div>


  );
}
