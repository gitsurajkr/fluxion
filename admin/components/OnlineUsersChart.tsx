import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface SignupData {
  date: string;
  count: number;
}

interface NewSignupsChartProps {
  signupsByDate?: SignupData[];
}

export default function Example({ signupsByDate }: NewSignupsChartProps) {
  // Default data if no data provided
  const defaultData = [
    { time: '8 AM', users: 5 },
    { time: '9 AM', users: 12 },
    { time: '10 AM', users: 20 },
    { time: '11 AM', users: 18 },
    { time: '12 PM', users: 25 },
    { time: '1 PM', users: 22 },
    { time: '2 PM', users: 28 },
    { time: '3 PM', users: 30 },
    { time: '4 PM', users: 35 },
    { time: '5 PM', users: 40 },
    { time: '6 PM', users: 38 },
    { time: '7 PM', users: 33 },
    { time: '8 PM', users: 27 },
    { time: '9 PM', users: 18 },
    { time: '10 PM', users: 10 },
  ];

  // Transform signupsByDate to chart format if provided
  const data = signupsByDate && signupsByDate.length > 0
    ? signupsByDate.map(item => ({
        time: item.date,
        users: item.count
      }))
    : defaultData;

  return (
    <LineChart
      style={{ width: '100%', maxWidth: '700px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />       
      <YAxis />                      {/* Number of users on Y-axis */}
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="users"
        stroke="#4A90E2"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
