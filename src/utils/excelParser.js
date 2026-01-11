import * as XLSX from 'xlsx';

/**
 * Reads and parses the Excel file containing farmer data
 * @param {string} filePath - Path to the Excel file
 * @returns {Promise<Array>} - Parsed farmer data
 */
export async function parseFarmerExcelData(path) {
  console.log("Fetching Excel:", path);

  const response = await fetch(path);
  console.log("Fetch response:", response);

  if (!response.ok) {
    throw new Error("Excel file not found");
  }

  const buffer = await response.arrayBuffer();
  console.log("Excel buffer size:", buffer.byteLength);

  const workbook = XLSX.read(buffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[1]];
  const data = XLSX.utils.sheet_to_json(sheet);
  console.log("Using sheet:", workbook.SheetNames[1]);
  console.log("Parsed Excel rows:", data.length);
  return data;
}

/**
 * Extracts unique values for filter options
 * @param {Array} data - Farmer data array
 * @param {string} field - Field name to extract unique values from
 * @returns {Array} - Array of unique values
 */
export function getUniqueValues(data, field) {
  if (!data || !Array.isArray(data)) return [];
  
  const values = data
    .map(item => item[field])
    .filter(value => value !== undefined && value !== null && value !== '');
  
  return [...new Set(values)].sort();
}

/**
 * Filters data based on selected criteria
 * @param {Array} data - Farmer data array
 * @param {Object} filters - Filter criteria object
 * @returns {Array} - Filtered data
 */
export function filterData(data, filters) {
  if (!data || !Array.isArray(data)) return [];
  
  return data.filter(item => {
    if (filters.village && item.village !== filters.village) return false;
    if (filters.hamlet && item.hamlet !== filters.hamlet) return false;
    if (filters.product && item.product !== filters.product) return false;
    return true;
  });
}

/**
 * Aggregates data for charts
 * @param {Array} data - Farmer data array
 * @param {string} groupBy - Field to group by
 * @returns {Array} - Aggregated data for charts
 */
export function aggregateData(data, groupBy) {
  if (!data || !Array.isArray(data)) return [];
  
  const grouped = data.reduce((acc, item) => {
    const key = item[groupBy] || 'Unknown';
    if (!acc[key]) {
      acc[key] = { name: key, count: 0, value: 0 };
    }
    acc[key].count += 1;
    acc[key].value += 1;
    return acc;
  }, {});
  
  return Object.values(grouped).sort((a, b) => b.count - a.count);
}
