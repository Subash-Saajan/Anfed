import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
  } from "recharts";
  
  export default function CropChart({ data }) {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="crop" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  