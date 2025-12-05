import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface RevenueData {
  date: string;
  revenue: number;
}

interface RevenueAreaChartProps {
  revenueByDate?: RevenueData[];
}

const RevenueAreaChart = ({ revenueByDate }: RevenueAreaChartProps) => {
  // Default data if no data provided
  const defaultData = [
    { date: "Jan", revenue: 12000 },
    { date: "Feb", revenue: 14500 },
    { date: "Mar", revenue: 17800 },
    { date: "Apr", revenue: 16200 },
    { date: "May", revenue: 19500 },
    { date: "Jun", revenue: 21000 },
    { date: "Jul", revenue: 18800 },
    { date: "Aug", revenue: 23000 },
    { date: "Sep", revenue: 25000 },
    { date: "Oct", revenue: 27500 },
    { date: "Nov", revenue: 30000 },
    { date: "Dec", revenue: 32500 },
  ];

  const data = revenueByDate && revenueByDate.length > 0 ? revenueByDate : defaultData;

  return (
    <AreaChart
      width={700}
      height={350}
      data={data}
      margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      {/* X-axis → dates */}
      <XAxis dataKey="date" />
      {/* Y-axis → revenue in dollars */}
      <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
      <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fill="#4f46e5" />
    </AreaChart>
  );
};

export default RevenueAreaChart;
