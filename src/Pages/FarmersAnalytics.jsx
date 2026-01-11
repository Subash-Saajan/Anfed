import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { parseFarmerExcelData, getUniqueValues, filterData, aggregateData } from '../utils/excelParser';
import { FarmerBarChart, FarmerPieChart, FarmerLineChart, StatisticsCards } from '../components/FarmerCharts';
import { DataFilters } from '../components/DataFilters';

export default function FarmersAnalytics() {
  const [excelData, setExcelData] = useState([]);
  const [dataFilters, setDataFilters] = useState({ village: '', hamlet: '', product: '' });
  const [filterOptions, setFilterOptions] = useState({ villages: [], hamlets: [], products: [] });
  const [loading, setLoading] = useState(true);

  // Load Excel data on component mount
  useEffect(() => {
    async function loadExcelData() {
      try {
        setLoading(true);
        const data = await parseFarmerExcelData('public/farmer website detail-1.xlsx');
        setExcelData(data);
        
        // Extract unique values for filters
        setFilterOptions({
          villages: getUniqueValues(data, 'village'),
          hamlets: getUniqueValues(data, 'hamlet'),
          products: getUniqueValues(data, 'product'),
        });
      } catch (error) {
        console.error('Error loading Excel data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadExcelData();
  }, []);
  // Get filtered data based on selected filters
  const filteredExcelData = filterData(excelData, dataFilters);


  

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-slate-600">Loading analytics data...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12 farmers-analytics">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Farmers Analytics Dashboard
          </h1>
          <p className="text-slate-600 mt-2">
            Visualize and analyze farmer data by village, hamlet, and product
          </p>
        </div>
        <Link
          to="/farmers"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          View Map
        </Link>
      </div>

      <div className="analytics-dashboard">
        {/* Filters */}
        <DataFilters
          filters={dataFilters}
          onFilterChange={setDataFilters}
          options={filterOptions}
        />

        {/* Statistics Cards */}
        <StatisticsCards data={filteredExcelData}/>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Village Distribution - Bar Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <FarmerBarChart
              data={aggregateData(filteredExcelData, 'village')}
              title="Farmers by Village"
            />
          </div>

          {/* Product Distribution - Pie Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <FarmerPieChart
              data={aggregateData(filteredExcelData, 'product')}
              title="Product Distribution"
            />
          </div>

          {/* Hamlet Distribution - Line Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <FarmerLineChart
              data={aggregateData(filteredExcelData, 'hamlet')}
              title="Farmers by Hamlet"
            />
          </div>

          {/* Additional Bar Chart for Products */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <FarmerBarChart
              data={aggregateData(filteredExcelData, 'product')}
              title="Product Count Analysis"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Farmer Data Table</h3>
            <span className="text-sm text-slate-600">
              Showing {Math.min(20, filteredExcelData.length)} of {filteredExcelData.length} records
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Village
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Hamlet
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                    Product
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredExcelData.length > 0 ? (
                  filteredExcelData.slice(0, 20).map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                        {row.village || '-'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                        {row.hamlet || '-'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-900">
                        {row.product || '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-slate-500">
                      No data available with current filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
