import React from 'react';

/**
 * Filter Component for data filtering
 */
export function DataFilters({ filters, onFilterChange, options }) {
  const { villages = [], hamlets = [], crops = [] } = options;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Filters</h3>
        {(filters.village || filters.hamlet || filters.crop) && (
          <button
            onClick={() => onFilterChange({ village: '', hamlet: '', crop: '' })}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear All
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Village Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">
            Village
          </label>
          <select
            value={filters.village || ''}
            onChange={(e) => onFilterChange({ ...filters, village: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-slate-900"
          >
            <option value="">All Villages</option>
            {villages.map((village, index) => (
              <option key={index} value={village}>
                {village}
              </option>
            ))}
          </select>
        </div>

        {/* Hamlet Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">
            Hamlet
          </label>
          <select
            value={filters.hamlet || ''}
            onChange={(e) => onFilterChange({ ...filters, hamlet: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-slate-900"
          >
            <option value="">All Hamlets</option>
            {hamlets.map((hamlet, index) => (
              <option key={index} value={hamlet}>
                {hamlet}
              </option>
            ))}
          </select>
        </div>

        {/* Product Filter */}
        {/* <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">
            Product
          </label>
          <select
            value={filters.crop || ''}
            onChange={(e) => onFilterChange({ ...filters, crop: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-slate-900"
          >
            <option value="">All Products</option>
            {crops.map((crop, index) => (
              <option key={index} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div> */}
      </div>

      {/* Active Filters Display */}
      {(filters.village || filters.hamlet || filters.crop) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.village && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Village: {filters.village}
              <button
                onClick={() => onFilterChange({ ...filters, village: '' })}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}
          {filters.hamlet && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              Hamlet: {filters.hamlet}
              <button
                onClick={() => onFilterChange({ ...filters, hamlet: '' })}
                className="hover:bg-green-200 rounded-full p-0.5"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}
          {filters.crop && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
              Product: {filters.crop}
              <button
                onClick={() => onFilterChange({ ...filters, crop: '' })}
                className="hover:bg-amber-200 rounded-full p-0.5"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
