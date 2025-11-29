import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Monthly revenue data (example)
const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 14500 },
  { month: "Mar", revenue: 17800 },
  { month: "Apr", revenue: 16200 },
  { month: "May", revenue: 19500 },
  { month: "Jun", revenue: 21000 },
  { month: "Jul", revenue: 18800 },
  { month: "Aug", revenue: 23000 },
  { month: "Sep", revenue: 25000 },
  { month: "Oct", revenue: 27500 },
  { month: "Nov", revenue: 30000 },
  { month: "Dec", revenue: 32500 },
];

const RevenueAreaChart = () => {
  return (
    <AreaChart
      width={700}
      height={350}
      data={data}
      margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      {/* X-axis → months */}
      <XAxis dataKey="month" />
      {/* Y-axis → revenue in dollars */}
      <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
      <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fill="#4f46e5" />
    </AreaChart>
  );
};

export default RevenueAreaChart;
