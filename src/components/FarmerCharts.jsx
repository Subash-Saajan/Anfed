import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#14b8a6", // teal
  "#f97316", // orange
  "#22c55e", // emerald
  "#0ea5e9", // sky
  "#a855f7", // purple
  "#eab308", // yellow
  "#06b6d4", // cyan
  "#dc2626", // dark red
];

/**
 * Bar Chart Component
 */
export function FarmerBarChart({ data, dataKey = 'value', nameKey = 'name', title }) {
  if (!data || data.length === 0) {
    return <div className="text-center text-slate-500 py-8">No data available</div>;
  }

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey={nameKey} 
            tick={{ fill: '#64748b', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          <Bar dataKey={dataKey} fill="url(#barGradient)" radius={[8, 8, 0, 0]} name="Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Pie Chart Component
 */
export function FarmerPieChart({ data, dataKey = 'value', nameKey = 'name', title,
  showPercent = true,
  showValue = true }) {
  if (!data || data.length === 0) {
    return <div className="text-center text-slate-500 py-8">No data available</div>;
  }

  // const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  //   const RADIAN = Math.PI / 180;
  //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
  //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

  //   return (
  //     <text
  //       x={x}
  //       y={y}
  //       fill="white"
  //       textAnchor={x > cx ? 'start' : 'end'}
  //       dominantBaseline="central"
  //       fontSize={12}
  //       fontWeight="600"
  //     >
  //       {`${(percent * 100).toFixed(0)}%`}
  //     </text>
  //   );
  // };

  //2nd
  // const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  //   const RADIAN = Math.PI / 180;
  //   const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
  //   const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  //   return (
  //     <text
  //       x={x}
  //       y={y}
  //       fill="white"
  //       textAnchor="middle"
  //       dominantBaseline="central"
  //       fontSize={12}
  //       fontWeight="600"
  //     >
  //       {`${(percent * 100).toFixed(0)}%`}
  //     </text>
  //   );
  // };
  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    let text = "";
    if (showValue) text = value;
    else if (showPercent) text = `${(percent * 100).toFixed(0)}%`;
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="600"
      >
        {text}
      </text>
    );
  };
  
  

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={CustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          {/* <Legend 
            verticalAlign="bottom" 
            height={36}
            wrapperStyle={{ fontSize: '12px' }}
          /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Line Chart Component
 */
export function FarmerLineChart({ data, dataKey = 'value', nameKey = 'name', title }) {
  if (!data || data.length === 0) {
    return <div className="text-center text-slate-500 py-8">No data available</div>;
  }

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
      <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey={nameKey} 
            tick={{ fill: '#64748b', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={{ fill: "#22c55e", r: 4 }}
            activeDot={{ r: 6 }}
            name="Count"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Statistics Cards Component
 */
export function StatisticsCards({ data, cropCount }) {
  // const totalFarmers = data?.length || 0;
  const totalFarmers = data.reduce(
    (sum, row) => sum + Number(row["Total Number of farmer"] || 0),
    0
  );
  const uniqueVillages = new Set(data.map(d => d["Village Name"])).size;
const uniqueHamlets = new Set(data.map(d => d["Hamlet Name"])).size;
const uniqueProducts = cropCount ?? 0;
  // const uniqueVillages = [...new Set(data?.map(d => d.village))].filter(Boolean).length;
  // const uniqueHamlets = [...new Set(data?.map(d => d.hamlet))].filter(Boolean).length;
  // const uniqueProducts = [...new Set(data?.map(d => d.product))].filter(Boolean).length;

  const stats = [
    { label: 'Total Farmers', value: totalFarmers, icon: '👨‍🌾', color: 'bg-blue-500' },
    { label: 'Villages', value: uniqueVillages, icon: '🏘️', color: 'bg-green-500' },
    { label: 'Hamlets', value: uniqueHamlets, icon: '🏡', color: 'bg-amber-500' },
    { label: 'Products', value: uniqueProducts, icon: '🌾', color: 'bg-purple-500' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
            <div className={`${stat.color} text-white text-2xl w-12 h-12 rounded-lg flex items-center justify-center`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
