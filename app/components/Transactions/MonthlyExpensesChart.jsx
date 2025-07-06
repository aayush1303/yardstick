import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Legend,
} from 'recharts';

export default function MonthlyExpensesChart({ data }) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value) =>
              typeof value === 'number' ? `$${value.toFixed(2)}` : value
            }
          />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" name="Total Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
