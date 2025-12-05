import { Cell, Pie, PieChart, Legend } from "recharts";

interface TemplatePieChartProps {
  activeTemplates?: number;
  inactiveTemplates?: number;
}

const RADIAN = Math.PI / 180;
const COLORS = ["#4CAF50", "#D32F2F"]; // Green for active, Red for inactive

// Label showing actual numbers inside slices
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      fontSize={15}
      fontWeight={700}
      textAnchor="middle"
      dominantBaseline="central"
    >
      {value}
    </text>
  );
};

export default function TemplatePieChart({ 
  activeTemplates = 85, 
  inactiveTemplates = 65 
}: TemplatePieChartProps) {
  // Active vs Inactive templates
  const data = [
    { name: "Active Templates", value: activeTemplates },
    { name: "Inactive Templates", value: inactiveTemplates },
  ];

  return (
    <PieChart
      style={{
        width: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
    >
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={0} // full pie (not donut)
        labelLine={false}
        label={renderCustomizedLabel}
        dataKey="value"
        isAnimationActive
      >
        {data.map((entry, index) => (
          <Cell key={entry.name} fill={COLORS[index]} />
        ))}
      </Pie>

      {/* Legend below */}
      <Legend verticalAlign="bottom" align="center" />
    </PieChart>
  );
}
