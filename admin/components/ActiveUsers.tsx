"use client";

import { useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Users } from "lucide-react";  // icon — optional

// Example live trend data (last 10 mins or 1 hour compressed)
const trendData = [
  { minute: 1, users: 1200 },
  { minute: 2, users: 1280 },
  { minute: 3, users: 1310 },
  { minute: 4, users: 1385 },
  { minute: 5, users: 1420 },
  { minute: 6, users: 1470 },
  { minute: 7, users: 1495 },
  { minute: 8, users: 1510 },
  { minute: 9, users: 1518 },
  { minute: 10, users: 1523 },
];

export default function ActiveUsersCard() {
  // These could come from API
  const currentUsers = 1523;
  const lastHourUsers = 1350;

  const change = ((currentUsers - lastHourUsers) / lastHourUsers) * 100;
  const isPositive = change >= 0;

  const deviceSplit = {
    mobile: 62,
    web: 29,
    tablet: 9,
  };

  return (
    <div className="bg-[#0d0f1a] text-white p-6 rounded-2xl shadow-lg flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-violet-400" />
        <h2 className="text-lg font-semibold text-gray-200">
          Active Users Right Now
        </h2>
      </div>

      {/* Number + change */}
      <div>
        <span className="text-4xl font-bold">{currentUsers.toLocaleString()}</span>
        <span
          className={`ml-3 font-semibold ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(change).toFixed(1)}% vs last hour
        </span>
      </div>

      {/* Mini spark chart */}
      <div className="h-20 w-full">
        <ResponsiveContainer>
          <LineChart data={trendData}>
            <Line
              type="monotone"
              dataKey="users"
              stroke="#7c3aed"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Device split */}
      <div className="flex justify-between text-sm mt-1 text-gray-300">
        <span>📱 Mobile {deviceSplit.mobile}%</span>
        <span>💻 Web {deviceSplit.web}%</span>
        <span>🖥 Tablet {deviceSplit.tablet}%</span>
      </div>
    </div>
  );
}
