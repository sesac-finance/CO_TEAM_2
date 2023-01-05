import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./chart.scss";

const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
];

const Chart = ({ aspect, title }) => {
  return (
    <div className="chart">
    <div className="title">{title}</div>

      <AreaChart
        width={670}
        height={400}
        data={data}
        margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
        }}
        >
        <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#589FFF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#589FFF" stopOpacity={0} />
            </linearGradient>
          </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Total" stroke="#589FFF" fill="url(#total)" fillOpacity={1} />
      </AreaChart>
    </div>
  );
};

export default Chart;
