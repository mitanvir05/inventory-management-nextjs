"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

interface ChartData {
  week: string;
  products: number;
}

export default function ProductChart({ data }: { data: ChartData[] }) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {/* Gradient */}
          <defs>
            <linearGradient id="productsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

          <XAxis
            dataKey="week"
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />

          {/* Tooltip */}
          <Tooltip
            cursor={{ stroke: "#8b5cf6", strokeDasharray: "4 4" }}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
            }}
            labelStyle={{ fontWeight: 600 }}
            formatter={(value: number) => [`${value}`, "Products"]}
          />

          {/* Legend */}
          <Legend
            verticalAlign="top"
            height={24}
            wrapperStyle={{ fontSize: "12px" }}
          />

          <Area
            type="monotone"
            dataKey="products"
            stroke="#8b5cf6"
            fill="url(#productsGradient)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            name="New Products"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
