import { useState } from "react";
import ExcelUpload from "..components/ExcelUpload";
import CropChart from "../utils/CropChart";
import { calculateCropTotals } from "../utils/analytics";

export default function AnalyticsPage() {
  const [rawData, setRawData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const handleParsedData = (data) => {
    setRawData(data);
    setChartData(calculateCropTotals(data));
  };

  return (
    <div>
      <h2>Farm Analytics Dashboard</h2>

      <ExcelUpload onDataParsed={handleParsedData} />

      {chartData.length > 0 && (
        <>
          <h3>Crop-wise Distribution</h3>
          <CropChart data={chartData} />
        </>
      )}
    </div>
  );
}
